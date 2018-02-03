import React from 'react';
import {render} from 'react-dom';
import Greeter from './branch1';

import './app.css';//使用require导入css文件

render(<Greeter />, document.getElementById('root'));