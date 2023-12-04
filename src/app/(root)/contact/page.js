export default function PageContact() {
  return (
    <div>
      <p className="text-blue-500 text-base italic font-semibold mb-2">- Find the Answers</p>
      <div className="text-[40px] font-bold leading-[56px] mb-[72px]">
        <p>We are always here to </p>
        <p>help you</p>
      </div>
      <div className="grid grid-cols-2 gap-y-10 gap-x-24 mb-36">
        <div>
          <p className="text-2xl font-semibold mb-4">Customer Services</p>
          <p className="leading-8">
            Please send us an email at
            <span className="font-semibold ml-1">
              <a
                className="decoration-solid underline"
                href="#"
              >
                customercare@KB&H.com
              </a>
            </span>
          </p>
        </div>
        <div>
          <p className="text-2xl font-semibold mb-4">Public Relations</p>
          <p className="leading-8">
            You can contact our media team by sending them an email at
            <span className="font-semibold ml-1">
              <a
                className="decoration-solid underline"
                href="#"
              >
                media@KB&H.com
              </a>
            </span>
          </p>
        </div>
        <div>
          <p className="text-2xl font-semibold mb-4">Large Orders</p>
          <p className="leading-8">
            If you are thinking of making a very large order, plese feel free to contact us at
            <span className="font-semibold ml-1 mr-1 ">
              <a
                className="decoration-solid underline"
                href="#"
              >
                sales@KB&H.com
              </a>
            </span>
            and we will give you a special discount
          </p>
        </div>
        <div>
          <p className="text-2xl font-semibold mb-4">Other Enquiries</p>
          <p className="leading-8">
            For all of your other questions, please send us an email at
            <span className="font-semibold ml-1">
              <a
                className="decoration-solid underline"
                href="#"
              >
                general@KB&H.com
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
