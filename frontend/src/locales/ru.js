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
            min: 'Необходимо минимум {{count}} символов',
            required: 'Это поле не может быть пустым',
          },
          password: {
            min: 'Пароль должен содержать минимум {{count}} символов',
            required: 'Пароль обязателен',
          },
          network: 'Ошибка авторизации',
        },
      },
      channels: {
        errors: {
          min: 'Необходимо минимум {{count}} символов',
          required: 'Это поле не может быть пустым',
          max: 'Максимум {{count}} символов',
          dublicate: 'Канал с таким именем уже существует',
        },
        buttons: {
          add: 'Создать',
          rename: 'Переименовать',
          delete: 'Удалить',
        },
        selectChannel: 'Выберите канал',
        placeholder: 'Имя канала',
      },
      message: {
        placeholder: 'Введите сообщение...',
        button: 'Отправить',
      },
      modal: {
        dontDrop: 'Это действие нельзя отменить.',
        realeDeleted: 'Вы уверены, что хотите удалить этот канал?',
      },
    },
    titles: {
      channels: 'Каналы',
    },
  },
};
