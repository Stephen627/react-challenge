import './Dropdown.css'
import React from 'react'

export interface Option {
  name: string
  value: string
}

export interface Props {
  options: Option[]
  selectedOption: string 
  onChange: (value: string) => void
  label: string
}

const Dropdown: React.FunctionComponent<Props> = (props: Props) => {
  const { options, selectedOption, onChange, label } = props

  const optionJsx = options.map((option: Option) => {
    return <option key={option.value} value={option.value}>{option.name}</option>
  })

  const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(evt.target.value)
  }

  return <div className="dropdown">
    <label className="dropdown__label">{label}</label>
    <select className="dropdown__select" value={selectedOption} onChange={onSelectChange}>
      <option value={''}>Please select...</option>
      {optionJsx}
    </select>
  </div>
}

export default Dropdown

