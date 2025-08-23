import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

function FaqsSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: `What is Rent Anything?`,
      answer: `Rent Anything is a platform where users can rent or list items for rent securely and conveniently.`
    },
    {
      question: `How do I rent an item?`,
      answer: `Browse available listings, select the item you want, check availability, and confirm your reservation.`
    },
    {
      question: `How can I list my item for rent?`,
      answer: `Go to your dashboard, click on "List Item," provide details, upload images, set the price, and publish.`
    },
    {
      question: `Is it safe to rent items on this platform?`,
      answer: `Yes. The platform includes user verification, secure communication, and reporting features to ensure safe transactions.`
    },
    {
      question: `What happens if an item is damaged during rental?`,
      answer: `Both parties can report issues. Our policy outlines responsibilities and provides a resolution process.`
    },
    {
      question: `Do I need an account to use the platform?`,
      answer: `Yes. You need to sign up to rent or list items, but browsing is open to everyone.`
    },
    {
      question: `Are there any fees for listing items?`,
      answer: `Listing items is free, but a small service fee may apply per successful rental transaction.`
    },
    {
      question: `Can I cancel a reservation?`,
      answer: `Yes, you can cancel before the rental period begins, following our cancellation policy.`
    }
  ];


  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
          Frequentyl Asked Questions
        </p>
        <p className="mt-6 text-lg/8 text-gray-700">
          Can't find the answer you're looking for? Reach out to our customer support team.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-10 px-6 lg:px-8 lg:max-w-7xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 lg:max-w-none lg:grid-cols-2 lg:gap-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => handleToggle(index)}
                className="w-full flex items-center justify-between text-left 
                   font-medium text-gray-600 
                   hover:text-blue-600 hover:scale-[1.02] 
                   transition-all duration-300 ease-in-out focus:outline-none"
              >
                <span>{faq.question}</span>
                <HiChevronDown
                  className={`h-5 w-5 transform transition-transform duration-300 ${openIndex === index ? "rotate-180 text-blue-600" : ""
                    }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
              >
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section >
  )
}

export default FaqsSection