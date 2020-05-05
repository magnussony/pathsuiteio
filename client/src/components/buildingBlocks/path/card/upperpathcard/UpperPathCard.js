import React from 'react'

// If props.image is true , return image else return no profile image - Pass the props from parent component

const UpperPathCard = (props) => {
  console.log(props.image)
  const renderUpperCard = () => {
    return props.image ? (
      <div className="flex">
        <img
          src={`data:image/png;base64, ${props.profilePhoto}`}
          className="rounded-full w-24 h-24"
          alt="profile"
        />
        <div className="ml-3">
          <h3>{props.name}</h3>
          <p>{props.jobTitle}</p>
          <p className="mt-3">{props.pathTitle}</p>
        </div>
      </div>
    ) : (
      <div>
        <h3>{props.pathTitle}</h3>
        <p className="mt-5">
          <i className="fas fa-user"></i> {props.name}
        </p>
      </div>
    )
  }
  return <div>{renderUpperCard()}</div>
}

export default UpperPathCard