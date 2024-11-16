import { useEffect, useState } from 'react'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function TableContent() {
    const [contacts, setContacts] = useState([]);
    const [reRender , setRerender] = useState(false)
    const navigate = useNavigate()

    const deleteContact = (phone) => {
        
        axios.delete("http://localhost:5000/delete-contact" , {data:{phone:phone}})
        .then((res)=>{
            console.log(res.data);
            
            setRerender(!reRender)
        })
        .catch(()=>{
            alert("something went wrong")
        })
    }

    useEffect(() => {
        axios.get("http://localhost:5000/contacts")
            .then((res) => {
                setContacts(res.data.value)
            })
            .catch(() => {
                alert("something went wrong")
                setContacts([])
            })
    }, [reRender])
    return (
        <>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Contact List
                </Typography>
                <Button variant='contained' color="warning" sx={{ cursor: "pointer", marginBottom: "1rem" }}
                    onClick={()=>{
                        navigate('contacts/0')
                    }}
                >
                    + Add another contact
                </Button>
                <TableContainer component={Paper} sx={{ maxHeight: 500, overflow: 'auto' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell>Job Title</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                contacts.length === 0 ? <TableRow><TableCell>No contacts !</TableCell></TableRow>

                                    : contacts.map((row, index) => (
                                        <TableRow key={index} sx={{ ":hover": { backgroundColor: "rgb(232, 232, 232)" } }}>
                                            <TableCell>{row.firstName}</TableCell>
                                            <TableCell>{row.lastName}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>{row.phone}</TableCell>
                                            <TableCell>{row.company}</TableCell>
                                            <TableCell>{row.jobTitle}</TableCell>
                                            <TableCell>
                                                <Button variant='contained' color="primary"
                                                    onClick={()=>{
                                                        navigate(`contacts/${row.id}`)
                                                    }}
                                                >Edit</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant='contained' color="error"
                                                    onClick={()=>{
                                                        deleteContact(row.phone)
                                                    }}
                                                >Delete</Button>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </>
    )
}

export default TableContent;




// I first made this Ui than i come to know we have to use tale component

{/* <>
<Container 
  maxWidth="sm"
  
  sx={
    {
      padding:"2rem 0",
      height:"100vh",
      display:"flex",
      flexDirection:"column",
      alignContent:"center",
       alignItems: 'center'
    }
  }
>
  <input type="text"  placeholder='Search Contacts'
    style={{
      width:"95%",
      padding:"10px  5px",
      borderRadius:"10px",
      marginBottom:"1rem",
      fontSize:"20px"
     
    }}
  />

  <List
    sx={{
      height:"95%",
      width:"95%",
      padding:"0 5px",
      borderRadius:"5px",
      overflow:"auto"
     
    }}
  >
     {
       contacts.map((item , i)=>{
        return(
         <ListItem key={i} 
          sx={
            {
              borderBottom:'1px solid gray',
              borderRadius:"10px",
              ":hover":{
                backgroundColor:"rgb(232, 232, 232)"
              }
            }
          }
         >
          <ListItemAvatar>
            <Avatar alt={item.name} src={item.avatar}/>
          </ListItemAvatar>

          <ListItemText 
            primary={item.name}
            secondary={item.phone}
          >

          </ListItemText>

          <ListItemIcon  
          >
            <Call 
            sx={{
              cursor:"pointer",
             
              borderRadius:"50%",
              padding:"4px",
            }}
            />
          </ListItemIcon>
         </ListItem>
        )
       })
     }
  </List>
</Container>
</>
) */}