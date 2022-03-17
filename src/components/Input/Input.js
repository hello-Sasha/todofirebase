import React from 'react';






export const Input=({value, setValue, submit, button})=>{
  const onChangeInput=(e)=>{
    setValue(e.target.value)
    e.preventDefault();
  }
  return (
    <>
      <form onSubmit={submit}>
        <input value={value} onChange={onChangeInput}/>
        <button> {button} </button>
      </form>

    </>

  )
}