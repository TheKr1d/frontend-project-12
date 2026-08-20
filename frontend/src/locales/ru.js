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
        logined: 'Войти',
        signup: 'Регистрация',
        info: 'Информация',
        succes: 'Успех',
        error: 'Ошибка',
        attention: 'Внимание',
        loading: 'Загрузка',
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
      channelCreated: 'Создаем новый канал. Пожалуйста, подождите',
      channelRenamed: 'Меняем имя канала. Пожалуйста, подождите',
      channelDeleted: 'Удаляем канал. Пожалуйста, подождите',
      channelCreatedSucces: 'Канал успешно создан!',
      channelCreateError: 'При создании канала возникла ошибка',
      channelRenamedSucces: 'Канал успешно изменен!',
      channelRenamedError: 'При изменении имени канала возникла ошибка',
      channelDeletedSucces: 'Канал успешно удален!',
      channelDeletedError: 'При удалении канала возникла ошибка',

      messageFetchError: 'Ошибка загрузки сообщений',
      messageAddError: 'Ошибка добавления сообщения',

      authSuccess: 'Добро пожаловать, {{username}}!',
      authError: 'Ошибка авторизации. Проверьте данные.',
      authUserLoad: 'Осуществляем регистрацию нового пользователя',
      authUserSucces: 'Вы были успешно зарегестрированы!',
      authUserError: 'Произошла ошибка при входе',
      authUserErrorUsernameAndPass: 'Неверное имя пользователя или пароль',

      loginUserLoad: 'Осуществляем вход в систему',
      loginUserSucces: 'Вы успешно вошли!',
      loginUserError: 'При входе возникла ошибка',

      serverError: 'Ошибка сервера',
      serverIsNotResponding: 'Сервер не отвечает',

      fetchError: 'Ошибка отправки запроса',
      dontAutorised:
        'Для перехода в чат, Вам необходимо войти или зарегестрироваться.',

      infoLogout:
        'Вы вышли из системы. Для возвращения нужно войти заново или зарегистрироваться.',
    },
  },
};
