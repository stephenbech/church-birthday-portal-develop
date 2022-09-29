import React, { createContext, useState, useEffect, useMemo }from "react";
// import axios from 'axios'
import jwt_decode from "jwt-decode";
import requests from "../utilities/requests";
import { decode } from "punycode";
import { FunctionDeclaration } from "typescript";
// const BASE_URL: string  = 'https://daba-102-89-34-29.eu.ngrok.io/api';
const Context = createContext<{
     openSideNav: () => void,
     collapseSideNav: () => void,
     isOpened: boolean,
     adminFirstName: string,
     adminLastName: string,
     adminDateOfBirth: string,
     adminRole: string,
     adminChurch: string,
     adminChurchId: number,
     churchesTable: IChurches[],
     memberTableData: never[],
     adminsTable: never[],
     serviceTableData: never[],
     churchTableData: never[],
     partnershipTableData: [],
     attendanceTableData: never[],
     cellTableData: never[],
     financeTableData: never[],
     signIn: () => void,
     signOut: () => void,
     result: boolean,
}>({
  openSideNav: () => {},
  collapseSideNav: () => {},
  isOpened: true,
  adminFirstName: "",
  adminLastName: "",
  adminDateOfBirth:'',
  adminRole: "",
  adminChurch: "",
  adminChurchId: 0,
  memberTableData: [],
  adminsTable: [],
  churchesTable: [],
  serviceTableData: [],
  churchTableData: [],
  partnershipTableData: [],
  attendanceTableData: [],
  cellTableData: [],
  financeTableData: [],
  signIn: () => {},
  signOut: () => {},
  result: true,
});
interface IContext{
     children: JSX.Element;
}
interface IToken{
     church: string;
     email: string;
     firstName:string;
     lastName:string;  
     password: string;
     role: string;
     churchId: string;
     iat: number;
}
interface IChurches{
     Name: string;
     Id: number;
     GroupId: number;
}
export function AccessContexts(props: IContext){
     const [isOpenSideNav, setIsOpenSideNav] = useState(true);
     const [tableData, setTableData] = useState([])
     const [adminsTableData, setAdminsTableData] = useState([])
     const [churchesData, setChurchesData] = useState<IChurches[]>([])
     const [serviceTable, setServiceTable] = useState([])
     const [churchTable, setChurchTable] = useState([])
     const [partnershipTable, setPartnershipTable] = useState([])
     const [attendanceTable, setAttendanceTable] = useState([]);
     const [cellTable, setCellTable] = useState([]);
     const [financeTable, setFinanceTable] = useState([]);


     const [adminFirstName, setAdminFirstName] = useState('')
     const [adminLastName, setAdminLastName] = useState('')
     const [adminDateOfBirth, setAdminDateOfBirth] = useState(Number)
     const [adminRole, setAdminRole] = useState('')
     const [adminChurch, setAdminChurch] = useState('')
     const [adminChurchId, setAdminChurchId] = useState('')
     const [userActiveStatus, setUserActiveStatus] = useState(false);
     const token = localStorage.getItem('token')
     useEffect(() => {
          let ignore = false;
          if(token){
               const decoded: IToken = jwt_decode(token);
               setAdminFirstName(decoded.firstName)
               setAdminLastName(decoded.lastName)
               setAdminChurchId(decoded.churchId)
               setAdminChurch(decoded.church);
               setAdminRole(decoded.role);
               console.log(decoded)
          }else{
               setAdminFirstName('')
               setAdminLastName('')
               setAdminDateOfBirth(Number)
               setAdminChurch('');
               setAdminRole('');

          }
          fetch(`${requests.getmembers}`).then(response =>{return response.json()}).then((data) => {
               setTableData(data.result)
               console.log(data)
          })
          fetch(`${requests.getChurches}`).then(response =>{return response.json()}).then((data) => {
               setChurchesData(data.result)
               console.log(data)
          })
          fetch(`${requests.getUsers}`).then(response =>{return response.json()}).then((data) => {
               setAdminsTableData(data.result)
               console.log(data)
          })
          // fetch(`${BASE_URL}/v2/service`).then(response =>{return response.json()}).then((data) => {
          //      setServiceTable(data)
          // }),

          // fetch(`${BASE_URL}/v2/church`).then(response =>{return response.json()}).then((data) => {
          //      setChurchTable(data)
          // }),
         
          // fetch(`${BASE_URL}/v2/partnership`).then(response =>{return response.json()}).then((data) => {
          //      setPartnershipTable(data)
          // }),
          // fetch(`${BASE_URL}/v2/attendance`).then(response =>{return response.json()}).then((data) => {
          //      setAttendanceTable(data)
          // }),

          // fetch(`${BASE_URL}/v2/cell-report`).then(response =>{return response.json()}).then((data) => {
          //      setCellTable(data)}),
          // fetch(`${BASE_URL}/v2/finance`).then(response =>{return response.json()}).then((data) => {
          //      setFinanceTable(data)
          // })
     }, [token])
     
     function closeSideNav(){
          setIsOpenSideNav(false)
     }
     function openSideNav(){
          setIsOpenSideNav(true);
     }

     function signedIn(){
          setUserActiveStatus(true);
     } 
     function signedOut(){
          setUserActiveStatus(false);
     }



     const value = {
          openSideNav: openSideNav,
          collapseSideNav: closeSideNav,
          isOpened: isOpenSideNav,
          adminFirstName: adminFirstName,
          adminLastName: adminLastName,
          adminDateOfBirth: adminDateOfBirth,
          adminRole: adminRole,
          adminChurch: adminChurch,
          adminChurchId: adminChurchId,
          memberTableData: tableData,
          adminsTable: adminsTableData,
          churchesTable: churchesData,
          serviceTableData: serviceTable,
          churchTableData: churchTable,
          partnershipTableData: partnershipTable,
          attendanceTableData: attendanceTable,
          cellTableData: cellTable,
          financeTableData: financeTable,
          result : userActiveStatus,
          signIn: signedIn,
          signOut: signedOut,
     }


     return <Context.Provider value={value}>
                    {props.children}
            </Context.Provider>
}

export default Context;
//https://github.com/marveldc08/church-service-portal.git