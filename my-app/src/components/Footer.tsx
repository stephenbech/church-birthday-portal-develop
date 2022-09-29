import React from 'react'
import styled from 'styled-components'
import { useContext } from 'react';
import { BiGridAlt, BiCollection, BiChurch, BiCopyright,BiLogOut } from "react-icons/bi";
import Context from './Contexts';

function Footer() {
     const userContext = useContext(Context);

  return (
    <div>
          <MainFooter>
               <div className='admin-shortcuts'>
                    {/* <img src='/images/admin.jpg' className={userContext.isOpened? 'show': 'hide'} /> */}
                    {/* <p className={userContext.isOpened? 'admin-details': 'hide'}> 
                         <span className='name'>{userContext.adminFirstName} {userContext.adminLastName}</span>
                         <span className='office'>{userContext.adminChurch} {userContext.adminRole}</span>
                    </p> */}
                    {/* <a href=''>
                         <BiLogOut className ='logout-icon' />
                    </a> */}
               </div>
               <p className={userContext.isOpened? '': 'hide'}>Christ Embasssy Lagos Zone 4 <span><BiCopyright/></span> 2022</p>
          </MainFooter>
    </div>
  )
}

export default Footer

const MainFooter = styled.div`
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     height: calc(100vh - (70vh + 70px));
     background-color: #01162c;
     border-top: 1px solid #f1f2f3;
     .admin-shortcuts{
          display: flex;
          justify-content: space-around;
          padding: 5px;
          width: 100%;
          position: relative;
          img{
               width: 40px;
               height: 40px;
               object-fit: cover;
               border-radius: 50px;
               cursor: pointer;

          }
          .admin-details{
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               padding: 2px;
               .name{
                    color: #ffffff;
                    font-size: 14px;
                    font-weight: 400;
                    padding: 5px 0px;
               }
               .office{
                    color: #ffffff;
                    font-size: 10px;
                    font-weight: 700;
                     

               }
               
          }
          a{
               .logout-icon{
                    color: white;
                    width: 35px;
                    height: 35px;
                    transition: all 250ms cubic-bezier(0.25, 0.45, 0.45, 0.94) 0s;
               }
               .logout-icon:hover{
                    color: gold;
               }
          }

     }
     p{
          color: #ffffff;
          text-align: center;
          font-size: 14px;
          font-weight: 700;
          line-height: 14px;
          transition: all 250ms cubic-bezier(0.25, 0.45, 0.45, 0.94) 0s; 
          cursor: pointer;
     }
     p:hover{
          color: gold;
          font-weight: 700;
     }
`