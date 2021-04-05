module.exports = {
  root: true,
  env: { node: true },
  extends: [ 'plugin:vue/essential', 'eslint:recommended','plugin:prettier/recommended'],
  parserOptions: { // eslint解析器配置项 
    // 解析器是用于解析js代码的，怎么去理解每一个表达式，有点C++中编译器的概念，会对js进行一些语法分析，语义分析什么的，才能判断语句符不符合规范。而不是通过简单的字符串对比。
    parser: 'babel-eslint'// 指定eslint解析器：babel-eslint是围绕Babel解析器的包装器使其与ESLint兼容；可能值
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "prettier/prettier": [
      "error",
      {
       "singleQuote": true,
       "trailingComma": "none",
       "bracketSpacing": true,
       "jsxBracketSameLine": true
      }
     ]
    // 'space-before-function-paren': 0, // 函数左边不要有括号
    // 'indent': 0, // script的缩进
    // 'no-unused-vars': 1, // 不能有声明后未被使用的变量或参数
    // 'eqeqeq': 0 // 允许使用双等号

  },
  plugins: ['vue', 'prettier'],


}