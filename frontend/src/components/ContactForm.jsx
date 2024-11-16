import { useForm } from "react-hook-form"
import axios from "axios"
import { useEffect, useState } from "react";
import "./ContactForm.css"
import { useNavigate, useParams } from "react-router-dom";

export default function ComponentForm() {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [response, setResponse] = useState()
    const [formValues, setFormValue] = useState(null)
    const param = useParams()
    const navigate = useNavigate()

    const update = (data) => {
        axios.put("http://localhost:5000/put-contact", {...data , id:param.id})
            .then((res) => {
                if(res.data.completed)
                {
                    navigate("/")
                }
                setResponse(res.data)
                
            })
            .catch(() => {
                alert("something went wrong")
            })
    }
    const onSubmit = (data) => {
        if (param.id == '0') {
            axios.post("http://localhost:5000/add-contact",data)
                .then((res) => [
                    setResponse(res.data)
                ])
                .catch(() => {
                    alert("something went wrong")
                })
        }
        else {
            update(data)
        }
    }

    useEffect(() => {
        if (formValues) {
            setValue("phone", formValues.phone);
            setValue("firstName", formValues.firstName);
            setValue("lastName", formValues.lastName);
            setValue("email", formValues.email);
            setValue("company", formValues.company);
            setValue("jobTitle", formValues.jobTitle);
        }
    }, [formValues, setValue]);

    useEffect(() => {
        if (param.id !== '0') {
            axios.post("http://localhost:5000/get-contact", { id: param.id })
                .then((res) => {
                    setFormValue(res.data.value)
                })
                .catch((e) => {
                    console.log(e);
                    
                    alert("something went wrong")
                    navigate("/")
                })
        }
    }, [])

    return (
        <div className="main-form">
            {
                response && <span style={{ backgroundColor: response.completed ? "green" : "red", color: "white", width: "100%", maxWidth: "600px", padding: "10px 0", marginBottom: "10px", textAlign: "center" }}>{response.message}</span>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <p>Phone Number</p>
                    <input type="text"  {...register("phone", {
                        required: { value: true, message: "Phone number is required" }
                    })} />
                    {
                        errors.phone && <span>{errors.phone.message}</span>
                    }
                </div>
                <div className="twoField">
                    <div className="field">
                        <p>First Name</p>
                        <input type="text"  {...register("firstName", {
                            required: { value: true, message: "first name is required" }
                        })} />
                        {
                            errors.firstName && <span>{errors.firstName.message}</span>
                        }
                    </div>
                    <div className="field">
                        <p>Last Name</p>
                        <input type="text"  {...register("lastName", {
                            required: { value: true, message: "last name is required" }
                        })} />
                        {
                            errors.lastName && <span>{errors.lastName.message}</span>
                        }
                    </div>
                </div>
                <div className="field">
                    <p>Email</p>
                    <input type="text"  {...register("email", {
                        required: { value: true, message: "Email is required" }
                    })} />
                    {
                        errors.email && <span>{errors.email.message}</span>
                    }
                </div>
                <div className="field">
                    <p>Company</p>
                    <input type="text" defaultValue={formValues ? formValues.company : ""} {...register("company", {
                        required: { value: true, message: "company is required" }
                    })} />
                    {
                        errors.company && <span>{errors.company.message}</span>
                    }
                </div>
                <div className="field">
                    <p>Job title</p>
                    <input type="text"  {...register("jobTitle", {
                        required: { value: true, message: "Job title is required" }
                    })} />
                    {
                        errors.jobTitle && <span>{errors.jobTitle.message}</span>
                    }
                </div>

                <div>
                    <button onClick={() => {
                        navigate("/")
                    }}>
                        Back
                    </button>

                    <button type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}