// import React from "react";

// /**
//  * Small icon badges for each payment method tile. These are generic,
//  * original icon marks (not reproductions of any brand's trademarked logo
//  * artwork) colored to match each provider's brand identity, so travelers
//  * can recognize a method at a glance instead of reading plain text.
//  */
// const PaymentMethodIcon = ({ method, size = 28 }) => {
//   if (method === "card") {
//     return (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//         <rect x="2" y="5" width="20" height="14" rx="2.5" fill="#2A2620" />
//         <rect x="2" y="9" width="20" height="3" fill="#F6EFE2" />
//         <rect x="4.5" y="14.5" width="6" height="1.6" rx="0.8" fill="#F6EFE2" />
//       </svg>
//     );
//   }

//   if (method === "esewa") {
//     return (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//         <circle cx="12" cy="12" r="11" fill="#60BB46" />
//         <path
//           d="M8 12.5c0-2.8 2-4.5 4.3-4.5 1.4 0 2.5.5 3.3 1.3l-1.3 1.4c-.5-.5-1.2-.8-2-.8-1.4 0-2.4 1.1-2.4 2.6s1 2.6 2.5 2.6c.9 0 1.6-.3 2.1-.9v-1h-2.2v-1.6h4v3.3c-.8 1-2.1 1.8-3.9 1.8-2.6 0-4.4-1.8-4.4-4.2z"
//           fill="white"
//         />
//       </svg>
//     );
//   }

//   if (method === "khalti") {
//     return (
//       <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
//         <circle cx="12" cy="12" r="11" fill="#5C2D91" />
//         <path d="M8 6.5h2.4v7.3c0 1.7 1 2.6 2.4 2.6.8 0 1.4-.2 1.9-.5l.6 1.8c-.7.5-1.7.8-2.8.8-2.6 0-4.5-1.5-4.5-4.5V6.5z" fill="white" />
//         <circle cx="15.5" cy="8" r="1.3" fill="white" />
//       </svg>
//     );
//   }

//   return null;
// };

// export default PaymentMethodIcon;


import React from "react";
import esewaLogo from "../../assets/icons/esewa.png";
import khaltiLogo from "../../assets/icons/khalti.png";

const PaymentMethodIcon = ({ method, size = 32 }) => {
  if (method === "card") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="2.5" fill="#2A2620" />
        <rect x="2" y="9" width="20" height="3" fill="#F6EFE2" />
        <rect
          x="4.5"
          y="14.5"
          width="6"
          height="1.6"
          rx="0.8"
          fill="#F6EFE2"
        />
      </svg>
    );
  }

  if (method === "esewa") {
    return (
      <img
        src={esewaLogo}
        alt="eSewa"
        style={{
          width: size,
          height: size,
          objectFit: "contain",
        }}
      />
    );
  }

  if (method === "khalti") {
    return (
      <img
        src={khaltiLogo}
        alt="Khalti"
        style={{
          width: size,
          height: size,
          objectFit: "contain",
        }}
      />
    );
  }

  return null;
};

export default PaymentMethodIcon;
