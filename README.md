# react-native-check-ip

Get public IP address using trusted APIs in React Native.

## Installation

```sh
npm install react-native-check-ip
```

## Usage

```js
import { getIp } from 'react-native-check-ip';

// ...
const result = await getIp();
```

## Response

|            | Parameter                                                                                                                                | Support     | Type    |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------- |
| message    | Returns success message or error message explaining the reason.                                                                          | Android/IOS | String  |
| ipv4       | Returns a public or local ipv4.                                                                                                          | Android/IOS | String  |
| isError    | Returns positive if there was an error to obtain the public ip.                                                                          | Android/IOS | Boolean |
| isPublicIp | Returns true if the ipv4 is a public ip, this only occurs if no errors have occurred.                                                    | Android/IOS | Boolean |
| isLocalIp  | Returns true if the ipv4 is a local ip, this only occurs if it has not been possible to obtain the public ip using all the apis + retry. | Android/IOS | Boolean |
| origin     | Returns who was responsible for providing ipv4. This can be AWS, IPIFY or Local (In case there was an error and ipv4 is localhost)       | Android/IOS | String  |

## Workflow

This lib tries to get public ipv4 using two public apis, having the AWS api as a priority and IPIFY as a secondary one, if both return an error or are unavailable, a new attempt will be made by calling the AWS API again. If all calls result in errors, Localhost IPv4 (127.0.0.1) is returned.

In the future we can add new APIs as a fallback, but we must always guarantee the highest availability rate and use APIs without usage limits.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
