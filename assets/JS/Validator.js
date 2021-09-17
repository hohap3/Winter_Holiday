function Validator(options) {

  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  const formElement = $(options.form);

  function getParentElement(element , select) {
    while(element.parentElement) {
      // Nếu tìm thấy element cha trùng với select , trả về element đó
      if(element.parentElement.matches(select))
        return element.parentElement;

      element = element.parentElement;  

    }
  } 

  function Validate(inputElement , rule) {
    
    var getParent = getParentElement(inputElement,options.formContainer);
    var errorSelector = getParent.querySelector(options.errorSelector);
    var errorMessage;
    var rules = selectorRule[rule.selector];

    for (let index in rules) {
      errorMessage = rules[index](inputElement.value);

      if(errorMessage) break;
    }

    // console.log(rules);

    // Nếu có lỗi tồn tại
    if(errorMessage) {
      errorSelector.innerText = errorMessage;
    }
    else {
      errorSelector.innerText = '';
    }
  }
  // Lấp ra selectorRule dùng để chứa các check
  var selectorRule = {};

  if(formElement) {

    formElement.addEventListener('submit',(e) => {

      e.preventDefault();
      
      options.rules.forEach((rule) => {
        var inputElement = $(rule.selector);
        Validate(inputElement,rule);
      })

    })
  
    options.rules.forEach((rule) => {
      const inputElements = $$(rule.selector);

      // Nếu mà selectorRule là array , thì ta thêm mới check vào
      if(Array.isArray(selectorRule[rule.selector]))
        selectorRule[rule.selector].push(rule.check);
      // Nếu mà selectorRule chưa là array , thì ta lấy check đầu tiên làm array
      else
        selectorRule[rule.selector] = [rule.check];  
  
      Array.from(inputElements).forEach((inputElement) => {
  
        // Khi mà người dùng blur chuột ra ngoài mà chưa nhập gì , ta báo lỗi
        inputElement.addEventListener('blur',() => {
          Validate(inputElement,rule);
        })

        // Khi người dùng điền thông tin , xóa lỗi hiện thị tạm thời
        inputElement.addEventListener('input',() => {
          var getParent = getParentElement(inputElement,options.formContainer);
          var errorSelector = getParent.querySelector(options.errorSelector);
          errorSelector.innerText = '';
        })

      });
  
    });
  
  }

}


// Rules
/**
 * Khi người dùng thực thi sai , sẽ báo lỗi
 */


Validator.isRequired = (selector) => {
  return {
    selector:selector,
    check:(value) => {
      return value.trim() ? undefined : 'The field is required.';
    }
  }
}

Validator.isEmail = (selector) => {
  return {
    selector:selector,
    check:(value) => {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return value.match(emailRegex) ? undefined : 'Email is not correct';
    }
  }
}