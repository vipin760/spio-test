import React from 'react'

const Automotion = () => {
  return (
    <div className="grid gap-[40px] grid-cols-2 md:grid-cols-4 lg:grid-cols-4 p-[40px]">
        <div className="rounded-[20px] p-[40px]  shadow-md" style={{ backgroundColor: "#FAFBFD" }}>
          <div className="flex flex-col justify-between gap-[40px]">
            <img src='/assets/images/automate/stripe.png' alt='Stripe'/>
            <h1 className="text-xl font-semibold">New Public Reviews</h1>
          </div>
        </div>
        <div className="rounded-[20px] p-[40px]  shadow-md" style={{ backgroundColor: "#FAFBFD" }}>
          <div className="flex flex-col justify-between gap-[40px]">
          <img src='/assets/images/automate/googlesheet.png' alt='Stripe'/>
            <h1 className="text-xl font-semibold">New Public Reviews</h1>
          </div>
        </div>
        <div className="rounded-[20px] p-[40px]  shadow-md" style={{ backgroundColor: "#FAFBFD" }}>
          <div className="flex flex-col justify-between gap-[40px]">
          <img src='/assets/images/automate/googleforms.png' alt='Stripe'/>
            <h1 className="text-xl font-semibold">New Public Reviews</h1>
          </div>
        </div>
    </div>
  )
}

export default Automotion