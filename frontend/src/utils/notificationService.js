import { notifications } from '@mantine/notifications';
import i18n from '../i18n.js';

const commonOptions = {
  position: 'top-center',
  withCloseButton: true,
};

const t = i18n.t;

class NotificationService {
  // Успешное уведомление
  success(message, title = 'common.titles.succes') {
    notifications.show({
      title: t(title),
      message: t(message),
      color: 'green',
      icon: '✅',
      autoClose: 2000,
      ...commonOptions,
    });
  }

  // Ошибка
  error(message, title = 'common.titles.error') {
    notifications.show({
      title: t(title),
      message: t(message),
      color: 'red',
      icon: '❌',
      autoClose: 5000,
      ...commonOptions,
    });
  }

  // Предупреждение
  warning(message, title = 'common.titles.attention') {
    notifications.show({
      title: t(title),
      message: t(message),
      color: 'yellow',
      icon: '⚠️',
      autoClose: 4000,
      ...commonOptions,
    });
  }

  // Информация
  info(message, title = 'common.titles.info') {
    notifications.show({
      title: t(title),
      message: t(message),
      color: 'blue',
      icon: 'ℹ️',
      autoClose: 4000,
      ...commonOptions,
    });
  }

  // Загрузка (с возвратом ID для обновления)
  loading(message, title = 'common.titles.loading') {
    return notifications.show({
      title: t(title),
      message: t(message),
      color: 'blue',
      loading: true,
      autoClose: false,
      ...commonOptions,
    });
  }

  // Обновление загрузки в успех
  updateLoadingToSuccess(id, message, title = 'common.titles.succes') {
    notifications.update({
      id,
      title: t(title),
      message: t(message),
      color: 'green',
      icon: '✅',
      loading: false,
      autoClose: 2000,
      ...commonOptions,
    });
  }

  // Обновление загрузки в ошибку
  updateLoadingToError(id, message, title = 'common.titles.error') {
    notifications.update({
      id,
      title: t(title),
      message: t(message),
      color: 'red',
      icon: '❌',
      loading: false,
      autoClose: 5000,
      ...commonOptions,
    });
  }

  // Очистка всех нотификаций
  clear() {
    notifications.clean();
  }
}

// Создаем и экспортируем синглтон
export const notificationService = new NotificationService();
