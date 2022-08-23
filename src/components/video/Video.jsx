import axios from "axios";
import Form from 'react-bootstrap/Form';
import { MDBFile } from 'mdb-react-ui-kit';
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {Button} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';



function Video(props) {
  const [video, videoSet] = useState({});
  const [videolist, videolistSet] = useState([]);
  let { course_id } = useParams();
  let video_id = 6;

  //new
  const [cats,setCats]=useState([]);
  const [data,setData]=useState({
  grades:"",
  upload_assign:"",
  assignment_video:"",
})
  function change(index) {
    console.log(index);
    videoSet(videolist[index]);
  }
// new 
function handle(e){
    const newdata={...data}
    newdata[e.target.name]= e.target.value
    setData(newdata)
    console.log("hello ",newdata);
}

function submit(e){
    console.log("done");
    console.log(e.target.upload_assign.files[0]);
    e.preventDefault();
    console.log('ddddddd',video_id)
    axios.post("http://127.0.0.1:8000/assignment/assignmentm/",{
      upload_assign: e.target.upload_assign.files[0],
      assignment_student:props.user.id,
      // assignment_student:data.assignment_student,
      assignment_video:video_id,
    },{headers:{
      'content-type':'multipart/form-data',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': `token ${props.user.token}`,
    }})
    .then(res=>{console.log("iam her",res.data);
      return alert('Your assignment has been CREATED successfully')})
  }
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/video/list/${course_id}`, {
        headers: {
          Authorization: `token ${props.user.token}`,
        },
      })
      .then((response) => {
        videolistSet(response.data);
        videoSet(response.data[0]);
        video_id = response.data[0].id;
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        // errorSet(error.response.data[Object.keys(error.response.data)[0]]);
        // loadingSet(false);
      });
      // try{
      //   axios.get("http://localhost:8000/category/list/")
      //   .then((res)=>{
      //     console.log("yaraaaaaaaaaaaab:",res.data);
      //       });
      //     }catch(error){
      //       console.log(error);
      //     }
  }, [props.user]);
  console.log(video_id);
  return (
    <div>
    {props.user.is_staff == "true"?
    <div className="container mx-auto">
      <div className="w-100 ">
        <div className="m-5">
          <ReactPlayer url={video.url} controls style={{ margin: "auto" }} />
          <div className="container mt-5">
            <div className="row">
              <div className="col-6">
                <div className="card">
                  {videolist.map((item, index) => (
                    <div
                      className="card bg-light m-2"
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-6">
                <Form onSubmit={submit}>
                      <br />
                      {/* <input type="submit" /> */}
                      <div className="d-flex">
                          
                            <div className="mx-3">
                              <NavLink to={`/allassignment/${course_id}`} style={{ textDecoration: 'none', color: 'white' }}><p className=' btn btn-primary'>
                                view assignment
                              </p></NavLink>  
                            </div>
                      </div>
                        
                      
                      </Form>    
              </div>
                        
            </div>
            <br />     
          </div>
        </div>
      </div>
    </div>
    :
    <div className="container mx-auto">
    <div className="w-100 ">
      <div className="m-5">
        <ReactPlayer url={video.url} controls style={{ margin: "auto" }} />
        <div className="container mt-5">
          <div className="row">
            <div className="col-6">
              <div className="card">
                {videolist.map((item, index) => (
                  <div
                    className="card bg-light m-2"
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            
            </div>
            <div className="col-6">
                  <Form onSubmit={submit}>
                    
                        <MDBFile className="w-50" id='customFile' name="upload_assign" onChange={(e)=>handle(e)}/><br />
                        <br />
                        <div className="d-flex">
                              <div >
                                <Button className="btn" type="submit">submit</Button>
                              </div>
                        </div>
                        </Form> 
               </div>  
                 
                 
                     
          </div>
         
                 
                
        </div>
      </div>
    </div>
  </div>
}</div>
   
  );
}
const mapStateToprops = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToprops)(Video);