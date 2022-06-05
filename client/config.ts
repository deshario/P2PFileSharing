const webRTCConnectionInfo = {
  iceServers: [
    {
      urls: [
        'stun:stun.stunprotocol.org',
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302'
      ],
    },
  ],
};

const socketURL = 'http://192.168.182.40:3000';
const getSlugRoute = `${socketURL}/slug`;

export { webRTCConnectionInfo, getSlugRoute, socketURL  };
