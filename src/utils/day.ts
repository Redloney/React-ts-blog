import dayjs from "dayjs";

import zh_cn from 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

dayjs.locale(zh_cn)

export default dayjs