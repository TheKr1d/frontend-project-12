export default {
  translation: {
    // Общие элементы интерфейса
    common: {
      buttons: {
        add: 'Создать',
        rename: 'Переименовать',
        delete: 'Удалить',
        logout: 'Выход',
        signup: 'Регистрация',
        login: 'Вход',
        send: 'Отправить',
        cancel: 'Отмена',
      },
      placeholders: {
        channelName: 'Имя канала',
        message: 'Введите сообщение...',
        passwordRepeat: 'Введите пароль еще раз',
        username: 'Введите ваш псевдоним',
        password: 'Введите пароль',
      },
      labels: {
        username: 'Псевдоним',
        password: 'Пароль',
        passwordRepeat: 'Повтор пароля',
        channel: 'Канал',
      },
      titles: {
        channels: 'Каналы',
        authorization: 'Авторизация',
        login: 'Вход',
        signup: 'Регистрация',
      },
    },

    // Валидация (общие правила)
    validation: {
      min: 'Минимум {{count}} символов',
      max: 'Максимум {{count}} символов',
      required: 'Это поле не может быть пустым',
      passwordsMatch: 'Пароли не совпадают',
      channelDuplicate: 'Канал с таким именем уже существует',
    },

    // Специфичные сообщения для форм
    forms: {
      auth: {
        networkError: 'Ошибка авторизации',
        invalidCredentials: 'Неверный логин или пароль',
      },
      channel: {
        create: {
          success: 'Канал создан',
          error: 'Не удалось создать канал',
        },
        rename: {
          success: 'Канал переименован',
          error: 'Не удалось переименовать канал',
        },
        delete: {
          confirm: 'Вы уверены, что хотите удалить этот канал?',
          success: 'Канал удален',
          error: 'Не удалось удалить канал',
          irreversible: 'Это действие нельзя отменить.',
        },
        select: 'Выберите канал',
      },
    },

    // Сообщения об ошибках (специфичные для полей)
    fieldErrors: {
      username: {
        required: 'Укажите псевдоним',
        min: 'Псевдоним должен содержать минимум {{count}} символов',
        taken: 'Этот псевдоним уже занят',
      },
      password: {
        required: 'Введите пароль',
        min: 'Пароль должен содержать минимум {{count}} символов',
      },
      passwordRepeat: {
        required: 'Подтвердите пароль',
        match: 'Пароли не совпадают',
      },
      channelName: {
        required: 'Укажите имя канала',
        min: 'Имя канала должно содержать минимум {{count}} символов',
        max: 'Имя канала не может превышать {{count}} символов',
        duplicate: 'Канал с таким именем уже существует',
      },
    },

    // Уведомления
    notifications: {
      channelCreated: 'Канал "{{name}}" создан',
      channelRenamed: 'Канал переименован в "{{name}}"',
      channelDeleted: 'Канал "{{name}}" удален',
      authSuccess: 'Добро пожаловать, {{username}}!',
      authError: 'Ошибка авторизации. Проверьте данные.',
    },
  },
};
