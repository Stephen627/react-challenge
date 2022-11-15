import React from 'react'

export interface Option {
  name: string
  value: string
}

export interface Props {
  options: Option[]
  selectedOption: string 
  onChange: (value: string) => void
}

const Dropdown: React.FunctionComponent<Props> = (props: Props) => {
  const { options, selectedOption, onChange } = props

  const optionJsx = options.map((option: Option) => {
    return <option key={option.value} value={option.value}>{option.name}</option>
  })

  const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(evt.target.value)
  }

  return <select value={selectedOption} onChange={onSelectChange}>
    <option value={''}>Please select...</option>
    {optionJsx}
  </select>
}

export default Dropdown

