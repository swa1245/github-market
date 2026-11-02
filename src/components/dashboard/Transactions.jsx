import avatar from '../../assets/images/user-avatar.svg'

const items = [
  {
    name: 'Devon Williamson',
    time: '08:00 AM — 19 August',
    amount: '+$1.400',
    type: 'Payment',
    positive: true,
  },
  {
    name: 'Kathryn Murphy',
    time: '09:15 AM — 19 August',
    amount: '-$850',
    type: 'Refund',
    positive: false,
  },
  {
    name: 'Cody Fisher',
    time: '11:30 AM — 20 August',
    amount: '+$2.100',
    type: 'Payment',
    positive: true,
  },
  {
    name: 'Leslie Alexander',
    time: '02:45 PM — 20 August',
    amount: '-$420',
    type: 'Refund',
    positive: false,
  },
  {
    name: 'Floyd Miles',
    time: '04:10 PM — 21 August',
    amount: '+$960',
    type: 'Payment',
    positive: true,
  },
]

export default function Transactions() {
  return (
    <div className="rounded-2xl border border-[#f0f1f3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-[#1f2937]">Transactions</h3>
        <button type="button" className="cursor-pointer text-[#9ca3af] hover:text-[#6b7280]">
          •••
        </button>
      </div>

      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.name + item.time} className="flex items-center gap-3">
            <img src={avatar} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-[#111827]">{item.name}</p>
              <p className="truncate text-[12px] text-[#9ca3af]">{item.time}</p>
            </div>
            <div className="text-right">
              <p
                className={`text-[13px] font-semibold ${
                  item.positive ? 'text-[#34d399]' : 'text-[#f87171]'
                }`}
              >
                {item.amount}
              </p>
              <p className="text-[12px] text-[#9ca3af]">{item.type}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
