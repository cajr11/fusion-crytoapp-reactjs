import React, { useState } from 'react';
import BscNetworks from './BscNetworks';
import EthereumNetworks from './EthereumNetworks';

const Chain = () => {
    const [ethActive, setEthActive] = useState(true);
    const [bscActive, setBscActive] = useState(false);

    const ethSelectedHandler = () => {
        setBscActive(false)
        setEthActive(true);
    }

    const bscSelectedHandler = () => {
        setEthActive(false);
        setBscActive(true)
    }

  return (
    <div className='w-11/12 mx-auto mt-10 flex items-center justify-center h-12'>

       <div className='w-full h-full flex items-center justify-between md:w-4/6'>

            {/* Chains */}
            <div className='w-40 md:w-52 h-full flex items-center justify-evenly border-2 border-gray-600 rounded-md'>
                <input type="radio" name="chain" value="Ethereum" className='hidden'/>
                <label htmlFor="ethereum" className={`${ethActive ? 'bg-neutral-900' : ''} text-stone-300 w-1/2 text-center h-full rounded-md flex items-center justify-center cursor-pointer text-sm`} onClick={ethSelectedHandler}>Ethereum</label>

                <input type="radio" name="chain" value="BSC" className='hidden'/>
                <label htmlFor="BSC" className={`${bscActive ? 'bg-neutral-900' : ''} text-stone-300 w-1/2 text-center h-full rounded-md flex items-center justify-center cursor-pointer text-sm`} onClick={bscSelectedHandler}>BSC</label>
            </div>


            {/* Networks */}
            {ethActive && <EthereumNetworks />}
            {bscActive && <BscNetworks />}

       </div>

    </div>
  )
}

export default Chain;