import axios from 'axios';

export interface CheckIp {
  message: string;
  ipv4: string;
  isError: boolean;
  isPublicIp: boolean;
  isLocalIp: boolean;
  origin: 'AWS' | 'IPIFY' | 'LOCAL';
}

const checkIp = RegExp(
  /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/gm
);

export async function getIp(): Promise<CheckIp> {
  const awsIp = await getAwsIp();

  if (!awsIp.isError) {
    return awsIp;
  }

  const ipifyIp = await getIpifyIp();

  if (!ipifyIp.isError) {
    return ipifyIp;
  }

  // Retry 1 time using AWS
  if (awsIp.isError && ipifyIp.isError) {
    const fallback = await getAwsIp();
    if (!fallback.isError) {
      return fallback;
    }
  }

  return {
    message: 'All apis returned an error or an ip outside the ipv4 mask.',
    ipv4: '127.0.0.1',
    isError: true,
    isPublicIp: false,
    isLocalIp: true,
    origin: 'LOCAL',
  };
}

async function getAwsIp(): Promise<CheckIp> {
  const awsIp = await axios.get('https://checkip.amazonaws.com');
  const ipFormatted = awsIp.data.replace('\n', '');
  if (ipFormatted) {
    if (checkIp.test(ipFormatted) && awsIp.status === 200) {
      return {
        message: 'Successfully.',
        ipv4: ipFormatted,
        isError: false,
        isPublicIp: true,
        isLocalIp: false,
        origin: 'AWS',
      };
    }
  }
  return {
    message: 'The aws api returned an error or an ip outside the ipv4 mask.',
    ipv4: '127.0.0.1',
    isError: true,
    isPublicIp: false,
    isLocalIp: true,
    origin: 'LOCAL',
  };
}

async function getIpifyIp(): Promise<CheckIp> {
  const ipifyIp = await axios.get('https://api.ipify.org?format=json');
  if (ipifyIp.data) {
    if (checkIp.test(ipifyIp.data.ip) && ipifyIp.status === 200) {
      return {
        message: 'Successfully.',
        ipv4: ipifyIp.data.ip,
        isError: false,
        isPublicIp: true,
        isLocalIp: false,
        origin: 'IPIFY',
      };
    }
  }
  return {
    message: 'The ipify api returned an error or an ip outside the ipv4 mask.',
    ipv4: '127.0.0.1',
    isError: true,
    isPublicIp: false,
    isLocalIp: true,
    origin: 'LOCAL',
  };
}
