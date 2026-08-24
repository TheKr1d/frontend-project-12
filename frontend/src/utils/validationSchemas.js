import * as Yup from 'yup';

export const loginSchema = (t) =>
  Yup.object({
    username: Yup.string()
      .min(4, t('validation.min', { count: 4 }))
      .required(t('validation.required')),
    password: Yup.string()
      .min(5, t('validation.min', { count: 5 }))
      .required(t('validation.required')),
  });

export const authorizationSchema = (t) =>
  Yup.object({
    username: Yup.string()
      .min(4, t('validation.min', { count: 4 }))
      .required(t('validation.required')),
    password: Yup.string()
      .min(6, t('validation.min', { count: 6 }))
      .required(t('validation.required')),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password'), null], t('validation.passwordsMatch'))
      .required(t('validation.required')),
  });

export const channelSchema = ({ t, channels }) =>
  Yup.object({
    channelName: Yup.string()
      .min(3, t('validation.min', { count: 3 }))
      .max(20, t('validation.max', { count: 20 }))
      .required(t('validation.required'))
      .notOneOf(
        channels.map((ch) => ch.name),
        t('validation.channelDuplicate'),
      ),
  });

export const renameChannelSchema = ({ t, channels }) =>
  Yup.object({
    newChannelName: Yup.string()
      .min(3, t('validation.min', { count: 3 }))
      .max(20, t('validation.max', { count: 20 }))
      .required(t('validation.required'))
      .notOneOf(
        channels.map((ch) => ch.name),
        t('validation.channelDuplicate'),
      ),
  });
