import React, { useState, useContext, useEffect} from 'react'
import { FaCaretDown } from 'react-icons/fa';
import { FaCogs } from 'react-icons/fa';
import { BiArrowToLeft } from 'react-icons/bi';
import { CSSTransition } from "react-transition-group";
import { AiOutlineBars } from "react-icons/ai";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import styled from 'styled-components';
import { MdAdminPanelSettings, MdOutlineGroups, MdHomeRepairService } from "react-icons/md";
import Context from './Contexts';
import './Header.css';
import {useNavigate, Link} from "react-router-dom";
import { useStorage, useGetStorage } from "../utilities/LocalStorage";

  const imageArray = [
    './images/icon1.jpeg',
    './images/icon2.jpg',
    './images/icon3.png',
    './images/icon4.jpg',
    './images/icon5.jpg',
  ]
  function Header() {
          const userContext = useContext(Context);
          const [iconSrc, setIconSrc] = useState('');
          const navigate = useNavigate();
          useEffect(() => {
               let randomNum = Math.floor(Math.random() * imageArray.length); 
               setIconSrc(imageArray[randomNum])
          }, [iconSrc])
     
      return (
          <Nav>
          <LeftMenu>
               <LogoDiv>
                    
                    {/* <div className={userContext.isOpened? 'logoCont': 'hide'}>
                         <img src='/images/logo-light.png'/>
                    </div> */}
                    <div className='logoText'>CELZ4</div>
               </LogoDiv>
              {/* <span>
              {userContext.isOpened ? <AiOutlineBars className ='icon' onClick={()=> {userContext.collapseSideNav()}} /> : <RiBarChartHorizontalLine className ='icon' onClick={()=> {userContext.openSideNav()}}/>}
              </span> */}
              {userContext.adminRole === 'Top Admin' &&  
              <li className='items'onClick={() => {navigate("/manage-admin")}} >
                    <a href='#'>
                         <MdAdminPanelSettings className='icon' />
                         <span className={userContext.isOpened? 'link-name': 'hide'} >Manage Admin</span>
                    </a>
               </li>}
             
               <li className='items'onClick={() => {navigate("/manage-members")}} >
                    <a href='#'>
                         <MdOutlineGroups className='icon' />
                         <span className={userContext.isOpened? 'link-name': 'hide'} >Manage Members</span>
                    </a>
               </li>             
          </LeftMenu>
      
        <RightMenu>
          <Name>
            <AdminsName>{userContext.adminFirstName} {userContext.adminLastName}</AdminsName>
            <ChurchAdmin>{userContext.adminRole}</ChurchAdmin>
          </Name>
          
          <UserImg src={iconSrc} />
          <NavItem icon={<FaCaretDown />}>
            <DropdownMenu className="dropdown"></DropdownMenu>
          </NavItem>
        </RightMenu>
          
          </Nav>
        );
     }
  interface Inav {
    icon?: JSX.Element;
    children: JSX.Element;
  }
 function NavItem(props: Inav) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}
interface Idropmenu {
  className: string;
}
function DropdownMenu(props:Idropmenu) {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(150);
  const userContext = useContext(Context);

  function handleSignout(){
    const token = localStorage.getItem('token');
    if(token){
      localStorage.removeItem('token')
      console.log(localStorage.length)
      console.log(localStorage)
      navigate('/')
    }
    else{
      console.log('no token')
    }
  }
  function calcHeight(el: { offsetHeight: number; }) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }
   interface Idrop{
     active?: boolean;
     leftIcon?: JSX.Element;
     rightIcon?: JSX.Element;  
      
     children?: string;
     goToMenu?: string;
   }
   function DropdownItem(props: Idrop) {
   
     return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className={props.active ? 'hi':"icon-button"}>{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  const navigate = useNavigate();
  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
            <DropdownItem active >{ 'Hi ' + userContext.adminFirstName}</DropdownItem>
            <DropdownItem
              leftIcon={<FaCogs />}
              goToMenu="settings">
              Settings
            </DropdownItem>
            <div onClick={() => {navigate('/'); handleSignout(); userContext.signOut();} }>
              <DropdownItem
                  leftIcon={<BiArrowToLeft />}
                goToMenu="Sign Out" >
                  Sign Out  
              </DropdownItem>
            </div>
        </div>
      </CSSTransition>    
    </div>
 );
}

export default Header

interface Iprops{
  className: string;
}

const Nav = styled.nav`
   height: 70px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   background: #ffffff;
   padding: 0 39px;
   overflow: hidden;
   border-bottom: 1px solid #808080;
   /* background: #fafbfd; */
   z-index: 9;
   .icon{
     width: 30px;
     height: 30px;
   }
`
const AdminsName = styled.div`
  margin-right: 25px;
  display: flexbox;
  align-items: center;
  /* justify-content: center; */
`
const Name =styled.div`
  /* justify-content: center;
  align-items: center; */
`

const ChurchAdmin = styled.div`
  text-align: center;
  margin-right: 20px;
  font-weight: bold;
  /* justify-content: center;
  align-items: center; */
`

const UserImg =styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-right:10px;
`
const RightMenu=styled.div`
  display: flex;
 
  align-items: center;
  
`

const LeftMenu =styled.div`
     align-items: center;
     cursor: pointer;
     display: flex;
     
     .items{
          list-style-type: none;
          position: relative;
          margin: 15px 20px ;
          padding: 5px;
          cursor: pointer;
          /* border: 1px solid green; */
          transition: all 250ms cubic-bezier(0.25, 0.45, 0.45, 0.94) 0s; 
          .icon-link{
               display: flex;
               align-items: center;
               
          }
          .icon-toggle-down{
               color: #ffffff;
               cursor: pointer;
               margin-left: 12px;
          }
          .icon-toggle-right{
               cursor: pointer;
               color: #ffffff;
                margin-left: 12px;
          }
          a{
               display: flex;
               align-items: center;
               text-decoration: none;
               /* border: 1px solid red; */
               .icon{
                    min-width: 40px;
                    height: 30px;
                    line-height: 40px;
                    border-radius: 4px;
                    color: #01162c;
                    cursor: pointer;
                    transition: all 250ms cubic-bezier(0.25, 0.45, 0.45, 0.94) 0s; 
               }
               .icon:hover{
                    color: gold;

               }
               .icon:active{
                 color: gold;
               }
               .link-name{
                    color: #01162c;
                    font-size: 18px;
                    font-weight: 600;
                    padding-left: 1px;
                    

                    &:before{
                         background-color: gold;
                         border-radius: 0px 0px 4px 4px;
                         bottom: -6px;
                         content: "";
                         height: 2px;
                         left: 0px;
                         opacity: 0;
                         position: absolute;
                         right: 0px;
                         transform-origin: left center;
                         transform: scaleX(0);
                         transition: all 250ms cubic-bezier(0.25, 0.45, 0.45, 0.94) 0s; 
                         visibility: hidden;
                         width: auto;
                    }
               }
          }
          a:hover{
               text-decoration: none;
          }

          &:hover{
               .icon, .link-name,.icon-toggle-right, .icon-toggle-down{
                    color: goldenrod;
               }
               .link-name:before{
                    transform: scaleX(1);
                    visibility: visible;
                    opacity: 1 !important;
               }
          }
     }
     @media screen and (max-width: 768px) {
          display: flex;
     }
`
const dropdownRef =styled.div``

const LogoDiv = styled.div`
     height: 70px;
     padding: 5px 10px;
     color: white;
     display: flex;
     justify-content: center;
     align-items: center;
     border-bottom: 1px solid #c4c4c4;
     /* background-color: #01162c !important; */

     .logoCont{
          flex: 60%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          img{
               width: 100%;
               height: 100%;
               object-fit: cover;
          }
     }
     .logoText{
          flex: 40%;
          color: #01162c;
          font-size: 20px;
          font-weight: 800;
          font-style: italic;
          display: flex;
          align-items: center;
          
     }
`

