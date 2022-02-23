import React, { useContext } from 'react'
import Chain from '../components/transfer/Chain'
import AuthContext from '../store/auth-context';

const Transfer = () => {
    const ctx = useContext(AuthContext)


    if (!ctx.isLoggedIn) {
        return (
            <div className='mt-3 mx-auto w-11/12 h-96 flex items-center justify-center'>
                <button className='w-40 h-16 rounded-md bg-neutral-900 font-bold text-stone-300' onClick={ctx.onLogin}>Connect Wallet</button>
            </div>
        )
    }

    if (ctx.isLoggedIn) {
            return (
            <div>
                <Chain />

                {/* Tranfer Form */}
                <form className='mt-3 w-11/12 lg:w-9/12 h-96 mx-auto border-2 border-gray-600 bg-neutral-900 flex items-center justify-center rounded-md'>
                    <div className='h-4/6 w-9/12 flex flex-col items-center justify-evenly border-2 border-gray-600'>
                        <input className='w-8/12 h-1/6 rounded-md placeholder-neutral-600 pl-3' type="number" step="0.1" placeholder='Amount' />
                        <input className='w-8/12 h-1/6 rounded-md placeholder-neutral-600 pl-3' type="text" minLength="42" maxLength="42" placeholder='Address' />
                        <button className='h-14 w-28 bg-gray-600 rounded-md font-bold text-stone-300'>Send</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Transfer;