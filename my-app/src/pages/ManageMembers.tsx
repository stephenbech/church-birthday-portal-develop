import React, { useContext,  useState, useRef, useEffect, HtmlHTMLAttributes } from 'react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Styled from 'styled-components';
import requests from '../utilities/requests';
import './ManageMembers.css';
import Context from '../components/Contexts';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { MdDeleteForever} from 'react-icons/md';
import { FaRegEye} from 'react-icons/fa';
import {FiRefreshCw} from 'react-icons/fi';
import USEMODAL from '../components/USEMODAL';
import { useNavigate } from 'react-router';
import { BiPlusMedical } from "react-icons/bi";
import 'react-phone-input-2/lib/style.css'
import Footer from '../components/Footer';

let churchesDetails = 
     [
          {
              "ChurchName":"CE Central Church",
              "PastorName":"Pastor Joe Agbaje",
              "PhoneNumber":"",
              "Group":"Central Church"
          },
          {
              "ChurchName":"CE Ota",
              "PastorName":"Pastor Olumide Ashiru David-King",
              "PhoneNumber":"+2348096812189",
              "Group":"Ota Group"
          },
          {
              "ChurchName":"CE Owode",
              "PastorName":" Brother Barnabas Ushilo",
              "PhoneNumber":"+2349058464741",
              "Group":"Ota Group"
          },
          {
              "ChurchName":"CE Alasia",
              "PastorName":" Pastor Jane Okpalanwan",
              "PhoneNumber":"+2348035044988",
              "Group":"Ota Group"
          },
          {
              "ChurchName":"CE Ifo 2",
              "PastorName":" Brother Shayi Olatunji",
              "PhoneNumber":"+2348035644796",
              "Group":"Ota Group"
          },
          {
              "ChurchName":"CE Ifo",
              "PastorName":" Brother Norbert Obogai",
              "PhoneNumber":"+2348073336800",
              "Group":"Ota Group"
          },
          {
              "ChurchName":"CE Ojuore",
              "PastorName":" Brother Fortune Peters",
              "PhoneNumber":" +2349093654210",
              "Group":"Ota Group"
          },
          {
              "ChurchName":"CE Ilogbo",
              "PastorName":" Brother Stephen Ben",
              "PhoneNumber":"+2347033589781",
              "Group":"Ota Group"
          },
          {
              "ChurchName":"CE The Bells",
              "PastorName":" Brother Ekeh Uchenna David",
              "PhoneNumber":"+2348121905677",
              "Group":"Ota Group"
          },
          {
              "ChurchName":"CE Ijoko",
              "PastorName":" Pastor Kasim Jimoh",
              "PhoneNumber":"+2348107258612",
              "Group": "Ijoko Group"
          },
          {
              "ChurchName":"CE Iyana Iyesi",
              "PastorName":" Broher Dare Taiwo",
              "PhoneNumber":"+2348101829343",
              "Group":"Ijoko Group"
          },
          {
              "ChurchName":"CE Atan ",
              "PastorName":" Pastor Felix Okonji",
              "PhoneNumber":"+2348058276409",
              "Group":"Ijoko Group"
          },
          {
              "ChurchName":"CE IJu",
              "PastorName":"Brother Ifeanyi Chukwdi",
              "PhoneNumber":"+2348064280577",
              "Group":"Ijoko Group"
          },
          {
              "ChurchName":"CE Lisa",
              "PastorName":" Brother Afolabi Tunde",
              "PhoneNumber":"+2348059860342",
              "Group":"Ijoko Group"
          },
          {
              "ChurchName":"CE Iyana 2",
              "PastorName":" Brother Moredayo Richard",
              "PhoneNumber":"+2348035270045",
              "Group":"Ijoko Group"
          },
          {
              "ChurchName":"CE Abule 1",
              "PastorName":" Brother Adeyemo Victor",
              "PhoneNumber":"+2348066777205",
              "Group":"Ijoko Group"
          },
          {
              "ChurchName":"CE Ntabo 1",
              "PastorName":" Brother OLumide Olamakinde",
              "PhoneNumber":"+2348180053565",
              "Group":"Ijoko Group"
          },
          {
              "ChurchName":"CE Sharp Corner",
              "PastorName":" Brother Onome Omoyibo",
              "PhoneNumber":"+2347035208321",
              "Group":"Ijoko Group"
          },
          {
              "ChurchName":"CE Alakuko",
              "PastorName":" Pastor Richard Ododo ",
              "PhoneNumber":"+2348096812189",
              "Group":"Alakuko Group"
          },
          {
              "ChurchName":"CE Abebi",
              "PastorName":" Brother Charles Iberi ",
              "PhoneNumber":"+2348029510709",
              "Group":"Alakuko Group"
          },
          {
              "ChurchName":"CE New Estate",
              "PastorName":" Sister Ebele Kennedy ",
              "PhoneNumber":"+2348095362643",
              "Group":"Alakuko Group"
          },
          {
              "ChurchName":"CE Worship Center",
              "PastorName":" Sister Lydia oparaji ",
              "PhoneNumber":"+2348064631787",
              "Group":"Alakuko Group"
          },
          {
              "ChurchName":"CE Temidire",
              "PastorName":" Brother Dennis Henry ",
              "PhoneNumber":"+2347033003657",
              "Group":"Alakuko Group"
          },
          {
              "ChurchName":"CE Ajegunle",
              "PastorName":" Brother Akpoya Anas ",
              "PhoneNumber":"+2349032885417",
              "Group":"Alakuko Group"
          },
          {
              "ChurchName":"CE Ilo",
              "PastorName":" Brother Samuel Ovajimoh ",
              "PhoneNumber":"+2349031939647",
              "Group":"Alakuko Group"
          },
          {
              "ChurchName":"CE Adura",
              "PastorName":" Brother Ebhodghe Charles ",
              "PhoneNumber":"+2348033746917",
              "Group":"Alakuko Group"
          },
          {
              "ChurchName":"CE Iloye",
              "PastorName":" Brother Zedek Okolie ",
              "PhoneNumber":"+2348164585044",
              "Group":"Alakuko Group"
          },
          {
              "ChurchName":"CE Adalemo 2",
              "PastorName":" Brother Emmanuel Ose ",
              "PhoneNumber":"+2349012262925",
              "Group":"Alakuko Group"
          },
          {
              "ChurchName":"CE Adalemo",
              "PastorName":" Brother Obanor Ikponmwosa",
              "PhoneNumber":"+2348106425302",
              "Group":"Alakuko Group"
          },
          {
              "ChurchName":"CE 5th Avenue",
              "PastorName":" Pastor Anthony Osula",
              "PhoneNumber":"+2347038574242",
              "Group":"Egbeda Group"
          },
          {
              "ChurchName":"CE Aboru",
              "PastorName":" Pastor Odion Oyarero",
              "PhoneNumber":"+2348132575467",
              "Group":"Egbeda Group"
          },
          {
              "ChurchName":"CE Aboru 2",
              "PastorName":" Pastor Christine Osula",
              "PhoneNumber":"+2348038265584",
              "Group":"Egbeda Group"
          },
          {
              "ChurchName":"CE Ayobo",
              "PastorName":" Pastor Gbemisola Orekoya",
              "PhoneNumber":"+2347082206978",
              "Group":"Egbeda Group"
          },
          {
              "ChurchName":"CE Akinola",
              "PastorName":" Brother Omorodion Frank",
              "PhoneNumber":"+2348033925020",
              "Group":"Egbeda Group"
          },
          {
              "ChurchName":"CE Baruwa",
              "PastorName":" Sister Laura Nnebedim",
              "PhoneNumber":"+2347081957799",
              "Group":"Egbeda Group"
          },
          {
              "ChurchName":"CE Abesan",
              "PastorName":" Brother Simeon Eigbedion ",
              "PhoneNumber":"+2349094630227",
              "Group":"Egbeda Group"
          },
          {
              "ChurchName":"CE 22 Road",
              "PastorName":" Brother Sebastian Ezeh ",
              "PhoneNumber":"+2348035318630",
              "Group":"Egbeda Group"
          },
          {
              "ChurchName":"CE Ayobo 2",
              "PastorName":" Brother Joshua Onyejiaka",
              "PhoneNumber":"+2347030613517",
              "Group":"Egbeda Group"
          },
          {
              "ChurchName":"CE Casso",
              "PastorName":" Pastor Chris Adeke ",
              "PhoneNumber":"+2348055177624",
              "Group":"Central Group"
          },
          {
              "ChurchName":"CE Ijaye",
              "PastorName":" Pastor Osas Dickson ",
              "PhoneNumber":"+2348023610300",
              "Group":"Central Group"
          },
          {
              "ChurchName":"Christ Embassy AIT Road",
              "PastorName":" Brother Ade Adetimilehin ",
              "PhoneNumber":"+2348060452857",
              "Group":"Central Group"
          },
          {
              "ChurchName":"CE Aminkonle",
              "PastorName":" Brother Michael Olugbayimu ",
              "PhoneNumber":"+2348024156705",
              "Group":"Central Group"
          },
          {
              "ChurchName":"CE Ajasa",
              "PastorName":" Brother Sybil Adeke ",
              "PhoneNumber":"+2347010689098",
              "Group":"Central Group"
          },
          {
              "ChurchName":"CE Agbele",
              "PastorName":" Brother Paul Gbassa ",
              "PhoneNumber":"+2348069458115",
              "Group":"Central Group"
          },
          {
              "ChurchName":"CE Merit",
              "PastorName":" Brother Afolabi Hezekiah",
              "PhoneNumber":"+2348163391143",
              "Group":"Central Group"
          } 
    ]

    
function ManageMembers() {
  const userContext = useContext(Context);
  const navigate = useNavigate();
  const {isShown, toggle } = USEMODAL();


   const [content, setContent] = useState(<></>)
   const [headerText, setHeaderText] = useState("")
   const titleRef = useRef<HTMLInputElement>();
   const firstnameRef = useRef<HTMLInputElement>();
   const lastnameRef = useRef<HTMLInputElement >();
   const genderRef = useRef<HTMLInputElement >();
   const emailRef = useRef<HTMLInputElement >();
   const phoneRef = useRef<HTMLInputElement >();
   const dateRef = useRef<HTMLInputElement >();
   const churchRef = useRef<HTMLInputElement>();
   const groupchurchRef = useRef<HTMLInputElement>();
   const [groupChurch, setGroupChurch] = useState('');
   const [Zone, setZone] = useState('');

   // Alert states
  const [alertHeader, setAlertHeader] = useState('');
  const [successAlert, setSuccessAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [alertClass, setAlertClass] = useState('');

  // State for updating the memmbers
  const [id, setId] = useState('')
  const [updateFirstName, setUpdateFirstName] = useState('')
  const [updateLastName, setUpdateLastName] = useState('')
  const [updateEmail, setUpdateEmail] = useState('')
  const [updatePhone, setUpdatePhone] = useState('')
  const [updateRole, setUpdateRole] = useState('')
  const [updateDate, setUpdateDate] = useState('')
  const [updateGender, setUpdateGender] = useState('')
  const [updateChurch, setUpdateChurch] = useState('')
  const [tableData, setTableData] = useState([])

     //     
  useEffect(() => {
     fetch(`${requests.getmembersByChurchId}${userContext.adminChurchId}`).then(response =>{return response.json()}).then((data) => {
          setTableData(data.result)
          console.log(data)
     })
  }, [])
  
  
  // document.getElementById('church')!.addEventListener('change', handleChurchChange);
  
  function handleChurchChange(){
    let currentChurch = document.getElementById('church') as HTMLInputElement; 
    // let groupChurch = document.getElementById('groupChurch')! as HTMLInputElement; 
    let currentValue = currentChurch.value; 
    console.log(currentValue)
    for(let i = 0; i < churchesDetails.length; i++){
        if(currentValue == churchesDetails[i].ChurchName){
          setGroupChurch(churchesDetails[i].Group);
          console.log(groupChurch)
        }
    }
  }


//   function sendEmail(e?: { preventDefault: () => void; }) {
//       e?.preventDefault();
//       let params = new URLSearchParams()
//       let role = document.getElementById('role') as HTMLSelectElement;
//       let church = document.getElementById('church') as HTMLSelectElement;
//       let groupChurch = document.getElementById('groupChurch') as HTMLInputElement; 
//       console.log(role.value);
//       params.set('firstname', `${firstnameRef.current?.value}`)
//       params.set('lastname', `${lastnameRef.current?.value}`)
//       params.set('email', `${emailRef.current?.value}`)
//       params.set('role', `${role.value}`)
//       params.set('church', `${church.value}`)
//       params.set('groupchurch', `${groupChurch.value}`);
//       console.log(params.toString())
//       Email.send({
//            SecureToken : "f2cce189-d9e8-4bc6-8604-bb86a87a4f88",
//            To : `${emailRef.current?.value}`,
//            From : "michaelchinye2018@gmail.com",
//            Subject : "Admin Invitation",
//            Body : `<!DOCTYPE html>
//            <html lang="en">
//               <head>
//                    <meta charset="UTF-8">
//                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
//                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                    <title>Document</title>
            
//                    <style>
//                         .imgDiv{
//                           height: 300px;
//                         }
//                         .content{
//                           padding: 50px;
//                         }
//                         h2{
//                           font-size: 18px;
//                         }
//                         @media only screen and (min-width: 480px) and (max-width: 767px){
//                                h1{
//                                     font-size: 22px;
//                                }
//                                h2{
//                                     font-size: 20px;
//                                }
//                                h3{
//                                     font-size: 19px;
//                                }
//                                p{
//                                     font-size: 16px;
//                                }
//                                .content{
//                                     padding: 20px;
//                                }
//                                .imgDiv{
//                                     height: 180px;
//                                }
//                         }
//                         @media (max-width: 767px){
//                                h1{
//                                     font-size: 22px;
//                                }
//                                h2{
//                                     font-size: 20px;
//                                }
//                                h3{
//                                     font-size: 19px;
//                                }
//                                p{
//                                     font-size: 16px;
//                                }
//                                .content{
//                                     padding: 20px;
//                                }
//                                .imgDiv{
//                                     height: 180px;
//                                }
//                         }
//                    </style>
//               </head>
//               <body>
//                    <div class="emailContainer" style = "background-color: #f9f9f9; margin: 0px auto;">
//                         <div>
//                             <div style="width: 100%;" class="imgDiv">
//                                  <a  href="index.html"><img style="width: 100%; height: 100%; object-fit: cover;" src="https://res.cloudinary.com/mike-ik/image/upload/v1652902981/Celz4-church-portal/toy-bricks-table-with-word-welcome_mdfguw.jpg"
//                                  alt=""></a>
//                              </div>
//                         </div>
//                         <div  class="content">
//                                <h1 style="text-align: center; color:#003366;">Christ Embassy Lagos Zone 4</h1>
//                                <h2 class="title" style="color:#003366;">Admin Invitation!</h2>
//                                <h3><span id="applicantName" style="color: #003366; ">Hi <b><i>${firstnameRef.current?.value} ${lastnameRef.current?.value}</i></b></span></h3>
//                                <p style="color: lignt-grey; line-height: 20px;">
//                                    Congratulations, you have been invited to become a ${role.value} for ${church.value} Church
//                                     <br/><br/>
//                                     Kindly follow the link below to complete your registration and begin your administrative work
//                                </p>
//                                <ul class="menu">
//                                     <li style="list-style-type: none;">Full Name: <b style="color:#003366; padding: 0px 5px;">${firstnameRef.current?.value} ${lastnameRef.current?.value}</b></li>
//                                     <li style="list-style-type: none;">Role: <b style="color:#003366; padding: 0px 5px;">${role.value}</b></li>
//                                </ul>
//                                <p class="sign-up">Click <span><a href="http://localhost:3000/create-account?${params.toString()}" id="signUpLink" >here</a></span> to proceed to Create your Account</p>
//                         </div>
//                    </div>
//               </body>
//            </html>`
//       }).then(() => {
//         setSuccessAlert(true); setAlertClass('alert alert-success alert-dismissible display'); setAlertContent(`
//         ${firstnameRef.current?.value} ${lastnameRef.current?.value} has successfully been invited as a ${role.value}. He or she should kindly check their email to continue to create their account`); setAlertHeader('Admin Successfully Invited!')
//       }).catch((err: any) => {
//         setSuccessAlert(true); setAlertClass('alert alert-danger alert-dismissible display'); setAlertContent(`${err}`); setAlertHeader('Error!')
//       })
//   }


//Modals Start Here

  function openUpdateModal() {      
    setHeaderText("Update Member")
      setContent(
        <React.Fragment>
        <form>
          <div className='input__wrapper'>
            <label className='flabel'>Title</label>
            <select className='finput' placeholder='Select Role' id='title' defaultValue={updateRole}>
                  <option  className='finput' value="">Select Title</option>
                  <option  className='finput' value="Zonal Pastor">Zonal Pastor</option>
                  <option  className='finput' value="Church Pastor">Church Pastor</option>
                  <option  className='finput' value="Deacon">Deacon</option>
                  <option  className='finput' value="Deaconess">Deaconess</option>
                  <option  className='finput' value="Cell Leader">Cell Leader</option>
                  <option  className='finput' value="Brother">Brother</option>
                  <option  className='finput' value="Sister">Sister</option>
            </select>
          </div>
          <div className='input__wrapper'>
            <label className='flabel'>First Name</label>
            <input type="text" className='finput' ref={firstnameRef} defaultValue={updateFirstName}  onChange = {event => setUpdateFirstName(event.target.value)} />
          </div>
          <div className='input__wrapper'>
            <label className='flabel'>Last Name</label>
            <input type="text" className='finput' ref = {lastnameRef} defaultValue={updateLastName} onChange = {event => setUpdateLastName(event.target.value)} />
          </div>
          <div className='input__wrapper'>
            <label className='flabel'>Email</label>
            <input type="email" className='finput' ref = {emailRef} defaultValue={updateEmail} onChange = {event => setUpdateEmail(event.target.value)} />
          </div>
          <div className='input__wrapper'>
                    <label className='flabel'>Gender</label>
                    <select  className="finput" id='gender' defaultValue={updateGender}> 
                         <option  className='finput' value="">Select Gender</option>
                         <option  className='finput' value="Male">Male</option>
                         <option  className='finput' value="Female">Female</option>
                    </select>
          </div>
          <div className='input__wrapper'>
                <label className='flabel'>Phone Number</label>
                <input className='finput'ref={phoneRef} defaultValue={updatePhone} type="tel" id="phone" name="phone" placeholder="08120839946" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required />
          </div>
          <div className='input-wrapper'>
               <label className='flabel'>Date of Birth</label>
               <input type="date"  className="finput" ref={dateRef} defaultValue={updateDate} onChange={event => setUpdateDate(event.target.value)}/>
          </div>
          <div className='input__wrapper'>
            <label className='flabel'>Church</label>
            <select className='finput' placeholder='Select Role' id='church' defaultValue={updateChurch}>
                  <option  className='finput' value="">Select Church</option>
                  {churchesDetails.map(element => (
                    <option  className='finput' value={element.ChurchName}>{element.ChurchName}</option>
                  ))}
            </select>
            
          </div>
          {/* <div className='input__wrapper'>
            <label className='flabel'>Group</label>
            <input type="text" className='finput' ref={groupchurchRef} id = 'groupChurch' defaultValue={updateGroup} onChange = {event => setUpdateGroup(event.target.value)} />
          </div> */}
          {/* <div className='input__wrapper'>
            <label className='flabel'>Status</label>
            <input type="text" className='finput' />
          </div> */}
          
        </form>

          <Buttons>
              <button className='invite__button' onClick={() => {updateMembers();}}>Submit</button>   
              {/* <button className='invite__button' onClick={toggle}>Close</button>                 */}
          </Buttons>
      </React.Fragment>
      )
  }

  function openViewModal() {
      setHeaderText("Member Details")
      setContent(
        <React.Fragment>
          <div className='viewdetails__wrapper'>
              <p className='viewlabel'>Title</p>
              <p className='viewinput'>{updateRole}</p>
          </div>
          <div className='viewdetails__wrapper'>
              <p className='viewlabel'>First Name</p>
              <p className='viewinput'>{updateFirstName}</p>
          </div>
          <div className='viewdetails__wrapper'>
              <p className='viewlabel'>Last Name</p>
              <p className='viewinput'>{updateLastName}</p>
          </div>
          <div className='viewdetails__wrapper'>
              <p className='viewlabel'>Gender</p>
              <p className='viewinput'>{updateGender}</p>
          </div>
          <div className='viewdetails__wrapper'>
              <p className='viewlabel'>Email</p>
              <p className='viewinput'>{updateEmail}</p>
          </div>
          <div className='viewdetails__wrapper'>
              <p className='viewlabel'>Phone Number</p>
              <p className='viewinput'>{updatePhone}</p>
          </div>
          <div className='viewdetails__wrapper'>
              <p className='viewlabel'>Date of Birth</p>
              <p className='viewinput'>{updateDate}</p>
          </div>
          <div className='viewdetails__wrapper'>
              <p className='viewlabel'>Church</p>
              <p className='viewinput'>{updateChurch}</p>
          </div>
          {/* <div className='viewdetails__wrapper'>
              <p className='viewlabel'>Group</p>
              <p className='viewinput'>{updateGroup}</p>
          </div> */}
          {/* <div className='viewdetails__wrapper'>
              <p className='viewlabel'>Status</p>
              <p className='viewinput'>Emeka chinye</p>
          </div> */}
      
        
        
        
      </React.Fragment>
      )
  }
//   const year = (new Date()).getFullYear();
//   const years = Array.from(new Array(80),( val, index) =>  year - index );


  const openInviteModal = () => {
      setHeaderText("Add Member")
      
      setContent(
        <React.Fragment>
        
        <form>
              
              <div className='input__wrapper'>
                <label className='flabel'>First Name</label>
                <input type="text" className='finput' ref={firstnameRef} />
              </div>
              <div className='input__wrapper'>
                <label className='flabel'>Last Name</label>
                <input type="text" className='finput' ref ={lastnameRef} />
              </div>
              <div className='input__wrapper'>
                <label className='flabel'>Email</label>
                <input type="email" className='finput' ref = {emailRef} />
              </div>
              <div className='input__wrapper'>
                <label className='flabel'>Phone Number</label>
                <input className='finput'ref={phoneRef} type="tel" id="phone" name="phone" placeholder="08120839946" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required />
              </div>
              <div className='input__wrapper'>
                    <label className='flabel'>Date of Birth</label>
                    <input type="date"  className="finput" ref={dateRef} />
              </div>
              
              <div className='input__wrapper'>
                    <label className='flabel'>Gender</label>
                    <select  className="finput" id='gender' > 
                         <option  className='finput' value="">Select Gender</option>
                         <option  className='finput' value="Male">Male</option>
                         <option  className='finput' value="Female">Female</option>
                    </select>
              </div>
              <div className='input__wrapper'>
                <label className='flabel'>title</label>
                <select className='finput' placeholder='Select title' id='title'>
                  <option  className='finput' value="">Select Role</option>
                  <option  className='finput' value="Zonal Pastor">Zonal Pastor</option>
                  <option  className='finput' value="Church Pastor">Church Pastor</option>
                  <option  className='finput' value="Deacon">Deacon</option>
                  <option  className='finput' value="Deaconess">Deaconess</option>
                  <option  className='finput' value="Cell Leader">Cell Leader</option>
                  <option  className='finput' value="Brother">Brother</option>
                  <option  className='finput' value="Sister">Sister</option>
                </select>
              </div>
              <div className='input__wrapper'>
                    <label className='flabel'>Church</label>
                    <select className='finput' placeholder='Select Church'id='church' >
                     <option value="">Select Church</option> 
                     {
                         userContext.churchesTable.map((church, index) => (
                              <option value={church.Name} key = {index}>{church.Name}</option>
                         ))
                     }
                    </select>
              </div>
              {/* <div className='input__wrapper'>
                <label className='flabel'>Group</label>
                <input type="text" className='finput' id='groupChurch' ref={groupchurchRef} />
              </div> */}
        </form>
        <Buttons>  
            <button className='invite__button' onClick={() => { inviteMembers();}}>Submit</button>
        </Buttons>
      </React.Fragment>
      )
  } 
// Modals End Here

function inviteMembers(e?: { preventDefault: () => void; }){
     let title = document.getElementById('title') as HTMLSelectElement;
     let gender = document.getElementById('gender') as HTMLSelectElement;
     let church = document.getElementById('church') as HTMLSelectElement;
     const members = {
          title: title.value,
         firstName: firstnameRef.current?.value,
         lastName: lastnameRef.current?.value,
         gender: gender.value,
         phoneNumber: phoneRef.current?.value,
         email: emailRef.current?.value,
         dateOfBirth: dateRef.current?.value,
         church: church.value,
     //     groupChurch: groupchurchRef.current?.value
     }
       e?.preventDefault()
       console.log(members)
       fetch(`${requests.postMember}${id}`,{
         method : 'POST',
         body : JSON.stringify(members),
         headers: {
             'content-Type': 'application/json'
         }
       }).then(response =>{return response}).then((data) => {
         setSuccessAlert(true); setAlertClass('alert alert-success alert-dismissible display'); setAlertContent(`Details of admin with id ${id} has been successfully updated. Kindly refresh to see changes`); setAlertHeader('Admin Successfully Updated!')
         console.log(data);
       }).catch(err => {
         setSuccessAlert(true); setAlertClass('alert alert-danger alert-dismissible display'); setAlertContent(`${err}`); setAlertHeader('Error!')
         console.log(err)
       })
   }

  function updateMembers(e?: { preventDefault: () => void;}){
     let title = document.getElementById('title') as HTMLSelectElement;
     let gender = document.getElementById('gender') as HTMLSelectElement;
     let church = document.getElementById('church') as HTMLSelectElement;
     const members = {
          title: title.value,
         firstName: firstnameRef.current?.value,
         lastName: lastnameRef.current?.value,
         gender: gender.value,
         phoneNumber: phoneRef.current?.value,
         email: emailRef.current?.value,
         dateOfBirth: dateRef.current?.value,
         church: church.value,
     //     groupChurch: groupchurchRef.current?.value
     }
       e?.preventDefault()
       console.log(members)
       fetch(`${requests.updateMembers}${id}`,{
         method : 'PUT',
         body : JSON.stringify(members),
         headers: {
             'content-Type': 'application/json'
         }
       }).then(response =>{return response}).then((data) => {
         setSuccessAlert(true); setAlertClass('alert alert-success alert-dismissible display'); setAlertContent(`Details of admin with id ${id} has been successfully updated. Kindly refresh to see changes`); setAlertHeader('Admin Successfully Updated!')
         console.log(data);
       }).catch(err => {
         setSuccessAlert(true); setAlertClass('alert alert-danger alert-dismissible display'); setAlertContent(`${err}`); setAlertHeader('Error!')
         console.log(err)
       })
  }

  function deleteMembers(id: string) {
     console.log(id)
     fetch(`${requests.deleteMembers}${id}`,{
          method: 'delete',
     }).then(response =>{return response}).then((data) => {
          setSuccessAlert(true); setAlertClass('alert alert-success alert-dismissible display'); setAlertContent(`Details of admin with id ${id} has been successfully deleted. Kindly refresh to see changes`); setAlertHeader('Admin Successfully Deleted!')
          console.log(data);
        }).catch(err => {
          setSuccessAlert(true); setAlertClass('alert alert-danger alert-dismissible display'); setAlertContent(`${err}`); setAlertHeader('Error!')
          console.log(err)
        })
     
  }

  document.querySelectorAll(".table__update__button")!.forEach(element => {
    element.addEventListener("click", handleUpdateAdmin);
  });
  
  document.querySelectorAll(".table__view__button")!.forEach(element => {
    element.addEventListener("click", handleViewAdmin);
  });
  function handleUpdateAdmin(this: any) {
      let tableRow = this.parentNode.parentNode;
      setId(tableRow.cells[0].innerHTML);
      setUpdateRole(tableRow.cells[1].innerHTML);
      setUpdateFirstName(tableRow.cells[2].innerHTML);
     setUpdateLastName(tableRow.cells[3].innerHTML);
     setUpdateGender(tableRow.cells[4].innerHTML);
     setUpdateEmail(tableRow.cells[5].innerHTML);
     setUpdatePhone(tableRow.cells[6].innerHTML);
     setUpdateDate(tableRow.cells[7].innerHTML);
     setUpdateChurch(tableRow.cells[8].innerHTML);

  }

  function handleViewAdmin(this: any) {
    let tableRow = this.parentNode.parentNode;
    setId(tableRow.cells[0].innerHTML);
    setUpdateRole(tableRow.cells[1].innerHTML);
    setUpdateFirstName(tableRow.cells[2].innerHTML);
    setUpdateLastName(tableRow.cells[3].innerHTML);
    setUpdateGender(tableRow.cells[4].innerHTML);
    setUpdateEmail(tableRow.cells[5].innerHTML);
    setUpdatePhone(tableRow.cells[6].innerHTML);
    setUpdateDate(tableRow.cells[7].innerHTML);
    setUpdateChurch(tableRow.cells[8].innerHTML);
  } 

  function clearForm(){
      firstnameRef.current!.value = '';
      lastnameRef.current!.value = '';
      emailRef.current!.value = '';
      churchRef.current!.value = '';
      groupchurchRef.current!.value = '';
  }

  
  

  const headers = ['ID','Title', 'First Name', 'Last Name', 'Gender', 'Email', 'Phone Number', 'Date of Birth', 'Church', " "]
  const memberArray = tableData.map(({Id, Title, FirstName, LastName, Gender, Email, PhoneNumber, DateOfBirth, Church,}) => {
     console.log(DateOfBirth)
      return {Id, Title, FirstName, LastName, Gender, Email, PhoneNumber, DateOfBirth, Church, }
  })
  const actions = <React.Fragment >
      <button className='table__button table__update__button'  onClick={() => { toggle(); openUpdateModal();}}>
        <span><FiRefreshCw className='table-button-icon' /></span> Update
      </button>
      <button className='table__button table__view__button' onClick={() => { toggle(); openViewModal();}}>
         <span><FaRegEye className='table-button-icon' /></span> View
      </button>
      <button className='table__button table__view__button' onClick={() => {deleteMembers(id);}}>
         <span><MdDeleteForever className='table-button-icon' /></span> Delete
      </button>
  </React.Fragment>


  return (
    <Container>
      {/* <SideNav /> */}
      <Contain show={userContext.isOpened}>
        <Header />
        <Content>
          <Actions>
            <button className='invite__button' onClick={()=> {toggle();  openInviteModal();}}> <span ><BiPlusMedical /></span> Add Member</button>
          </Actions>
        <DataTable data={memberArray} headers = {headers} actions = {actions} tableTitle = 'CELZ4 Birthday Database'/> 
        <div className= {successAlert? alertClass : "hide"}>
            <button type="button" className="close" data-dismiss="alert" onClick= {() => {setSuccessAlert(false);}}>&times;</button>
              <h4><b>{alertHeader}</b></h4>
              <p>{alertContent}</p>
        </div> 
        <Modal isShown={isShown} hide={toggle} modalContent={content} headerText={headerText} />
        </Content>
      </Contain>
      <Footer/>
    </Container>
  )
}

export default ManageMembers
interface Iprops{
  show: boolean;
}

const Container = Styled.div` 
position: relative;
`
const Contain =Styled.div<Iprops >`
    position: relative;
    /* margin-left: ${(props: { show: any; }) => props.show ? '300px':'78px'}; */
    height: 100vh;
    overflow: auto;
    background-color: #f1f2f3;
    transition: all 0.35s ease; 
    &::-webkit-scrollbar{
          display: none;
    }
`

const Content = Styled.div`
  background: #f1f2f3;
  height: calc(100vh - 70px);
  padding: 1rem;
`
const Actions = Styled.div`
    display: flex;
    justify-content: flex-end;
    /* border: 1px solid red; */
    padding: 10px;
    button{
      span{
        padding: 0px 8px;
      }
    }
`
const Buttons =Styled.div`
   display: flex;
   justify-content: flex-end;
   /* margin: 10px 50px;  */
`


