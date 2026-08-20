import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setActiveChannel } from '../slices/channels';
import { setType } from '../slices/modal';

const Channels = ({ channels, activeChannelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const hangleRename = (channel) => {
    dispatch(setActiveChannel(channel));
    dispatch(setType({ type: 'rename', channelId: channel.id }));
  };

  return (
    <div
      className="flex-grow-1 overflow-auto"
      style={{ maxHeight: 'calc(100vh - 150px)' }}
    >
      <div className="list-group list-group-flush">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center px-3 py-2 ${
              channel.id === activeChannelId ? 'active' : ''
            }`}
          >
            <button
              type="button"
              className={`flex-grow-1 text-start border-0 bg-transparent p-0 ${
                channel.id === activeChannelId ? 'text-white' : ''
              }`}
              onClick={() => dispatch(setActiveChannel(channel))}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
            {channel.removable && (
              <Dropdown
                as={ButtonGroup}
                drop="end"
                size="sm"
                onClick={() => dispatch(setActiveChannel(channel))}
              >
                <Dropdown.Toggle
                  as="span"
                  id={`dropdown-channels-${channel.id}`}
                  variant="secondary"
                  className="dropdown-toggle-split"
                  style={{ cursor: 'pointer' }}
                />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => hangleRename(channel)}>
                    {t('common.buttons.rename')}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(
                        setType({ type: 'delete', channelId: channel.id }),
                      )
                    }
                  >
                    {t('common.buttons.delete')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channels;
