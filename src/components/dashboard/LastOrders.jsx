import avatar from '../../assets/images/user-avatar.svg'
import DateRange from './DateRange'

const orders = [
  {
    name: 'Regina Cooper',
    orderNo: '#790841',
    amount: '$2.500',
    payment: 'Credit Card',
    date: '12.09.2019',
  },
  {
    name: 'Jacob Jones',
    orderNo: '#790842',
    amount: '$1.200',
    payment: 'PayPal',
    date: '13.09.2019',
  },
  {
    name: 'Leslie Alexander',
    orderNo: '#790843',
    amount: '$850',
    payment: 'Credit Card',
    date: '14.09.2019',
  },
  {
    name: 'Darlene Robertson',
    orderNo: '#790844',
    amount: '$3.100',
    payment: 'Bank Transfer',
    date: '15.09.2019',
  },
]

export default function LastOrders() {
  return (
    <div className="rounded-2xl border border-[#f0f1f3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-[#1f2937]">Last Orders</h3>
        <DateRange />
      </div>

      <div className="mb-2 hidden grid-cols-[1.4fr_1fr_0.8fr_1fr_0.9fr_40px] gap-3 px-4 text-[12px] font-medium text-[#9ca3af] md:grid">
        <span>Customer Name</span>
        <span>Order No.</span>
        <span>Amount</span>
        <span>Payment Type</span>
        <span>Date</span>
        <span />
      </div>

      <div className="space-y-2.5">
        {orders.map((row) => (
          <div
            key={row.orderNo}
            className="grid grid-cols-1 items-center gap-3 rounded-full bg-[#F5F5F5] px-4 py-3 md:grid-cols-[1.4fr_1fr_0.8fr_1fr_0.9fr_40px]"
          >
            <div className="flex items-center gap-3">
              <img src={avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
              <span className="text-[13px] font-semibold text-[#1f2937]">{row.name}</span>
            </div>
            <span className="text-[13px] text-[#6b7280]">{row.orderNo}</span>
            <span className="text-[13px] font-medium text-[#3F434A]">{row.amount}</span>
            <span className="text-[13px] text-[#6b7280]">{row.payment}</span>
            <span className="text-[13px] text-[#4b5563]">{row.date}</span>
            <button
              type="button"
              className="flex h-8 w-8 cursor-pointer items-center justify-center justify-self-end rounded-full text-[#9E9E9E] hover:bg-[#ebebeb] hover:text-[#6b7280]"
              aria-label="More options"
            >
              <svg width="4" height="16" viewBox="0 0 4 16" fill="currentColor" aria-hidden="true">
                <circle cx="2" cy="2" r="1.5" />
                <circle cx="2" cy="8" r="1.5" />
                <circle cx="2" cy="14" r="1.5" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
