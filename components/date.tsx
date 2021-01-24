import moment from 'moment'
moment.locale('id')

export default function Date({ dateString }) {
    return <time dateTime={moment(dateString).toISOString()}>{moment(dateString).format('LL')}</time>
}