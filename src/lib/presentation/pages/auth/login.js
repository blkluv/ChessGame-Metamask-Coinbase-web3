import React from "react";
import Navbar from "../../components/navbar";
import "../../css/login.css";
import Web3 from 'web3';
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Bgr from "../../../core/resources/images/BG.jpg"

function Login() {
    let history = useNavigate();
    const [isConnected, setIsConnected] = useState(false);
    const [ethBalance, setEthBalance] = useState("");
    
    const detectCurrentProvider = () => {
      let provider;
      if (window.ethereum) {
        provider = window.ethereum;
      } else if (window.web3) {
        provider = window.web3.currentProvider;
      } else {
        console.log("Non-ethereum browser detected. You should install Metamask");
      }
      return provider;
    };
    
    const onConnect = async() => {
      try {
        const currentProvider = detectCurrentProvider();
        if(currentProvider) {
          await currentProvider.request({method: 'eth_requestAccounts'});
          const web3 = new Web3(currentProvider);
          const userAccount  =await web3.eth.getAccounts();
          const account = userAccount[0];
          let ethBalance = await web3.eth.getBalance(account);
          setEthBalance(ethBalance);
          setIsConnected(true);
          toast.success("Login Successful");
          history("/administrator");
        }
      } catch(err) {
        console.log(err);
        toast.error("Login Failed, Non-ethereum browser detected. You should install Metamask");
      }
    }
    
    const onDisconnect = () => {
      setIsConnected(false);
    }
    
  return (
    <div>
      <section className="bg">
        <Navbar />
        <div className="relative py-12 bg-white sm:py-16 lg:py-20">
          <div className="absolute inset-0">
            <img
              className="object-cover object-center w-full h-full lg:object-center bg-white img-pic"
                src={Bgr}
              alt=""
            />
          </div>
          <div className="h-[70vh] flex justify-center items-center">
            <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <div className="max-w-lg mx-auto text-center xl:max-w-2xl">
                <h1 className="text-3xl text-black font-bold sm:text-6xl xl:text-5xl">
                  Welcome to Chess Games
                </h1>
                <p className="max-w-lg mx-auto mt-2 text-base font-normal leading-7 text-black ">
                  Sign in with your wallet to be able to authenticate and play
                  games
                </p>

                <div  className="max-w-sm mx-auto mt-10">
                  <div>
                  {!isConnected && (
                    <button onClick={onConnect}
                      type="submit"
                      className="
                                inline-flex
                                items-center
                                justify-center
                                w-full
                                px-6
                                py-6
                                my-2
                                text-md
                                text-white   
                                bg-[#438FFE]
                                border border-transparent
                                rounded-full "
                    >
                      Sign in with metamask
                    </button>
                    )}
                    <button
                      type="submit"
                      className="
                                inline-flex
                                items-center
                                justify-center
                                w-full
                                px-6
                                py-6
                                my-2
                                text-md
                                text-black
                                bg-transparent
                                border-2
                                border-black
                                rounded-full "
                    >
                      Sign in with Coinbase Wallet
                    </button>
                  </div>
                </div>
                <a className="text-center mt-8" href="">Show more options</a>
              </div>
            </div>
          </div>
        </div>
        {/* {isConnected && (
        <div className="app-wrapper">
          <div className="app-details">
            <h2> You are connected to metamask.</h2>
            <div className="app-balance">
              <span>Balance: </span>
              {ethBalance}
            </div>
          </div>
          <div>
            <button className="app-buttons__logout" onClick={onDisconnect}>
            Disconnect
            </button>
          </div>
        </div>
      )} */}
      </section>
    </div>
  );
}

export default Login;