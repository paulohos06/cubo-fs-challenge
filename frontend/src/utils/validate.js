import { required } from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'

const init = () => {
  const needed = () => {
    return { ...required, message: 'This field is required!' }
  }
  
  const minMaxLength = () => {
    return {
      validate(value, { min, max }) {
        return value.length >= min && value.length <= max
      },
      params: ['min', 'max'],
      message: `This field must have mininum {min} and maximum {max} characters!`
    }
  }
  
  const onlyNumber = () => {
    return {
      validate(value) {
        const pattern = /[0-9][0-9]/g 
        return value.match(pattern)
      },
      message: 'This field is numeric!'
    }
  }

  extend('required', needed())
  extend('minmax', minMaxLength())
  extend('numbers', onlyNumber())
}

export default init