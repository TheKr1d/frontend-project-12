export default {
  translation: {
    forms: {
      authorization: {
        title: 'Авторизация',
        username: {
          title: 'Псевдоним',
          placeholder: 'Введите ваш псевдоним',
        },
        password: {
          title: 'Пароль',
          placeholder: 'Введите пароль',
        },
        errors: {
          username: {
            min: 'Псевдоним должен быть минимум {{count}} символов',
            required: 'Псевдоним обязателен обязателен',
          },
          password: {
            min: 'Пароль должен содержать минимум {{count}} символов',
            required: 'Пароль обязателен',
          },
          network: 'Ошибка авторизации',
        },
      },
    },
  },
};
