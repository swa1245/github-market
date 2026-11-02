import chartIcon from '../../assets/images/Chart.svg'
import dollarIcon from '../../assets/images/Dollar.svg'
import userIcon from '../../assets/images/User [Fill].svg'

function ArrowUp() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 14 6-6 6 6" />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 10 6 6 6-6" />
    </svg>
  )
}

const cards = [
  {
    title: 'Total Income',
    value: '$8.500',
    percent: '50.8%',
    up: true,
    icon: dollarIcon,
  },
  {
    title: 'Total Sales',
    value: '3.500K',
    percent: '10.5%',
    up: false,
    icon: chartIcon,
  },
  {
    title: 'New Clients',
    value: '2.500K',
    percent: '24.9%',
    up: true,
    icon: userIcon,
  },
]

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="flex items-start justify-between rounded-2xl border border-[#f0f1f3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
        >
          <div>
            <p className="mb-3 text-[14px] font-medium text-[#9ca3af]">{card.title}</p>
            <div className="flex items-center gap-2.5">
              <h3 className="text-[28px] leading-none font-semibold text-[#1f2937]">
                {card.value}
              </h3>
              <span
                className={`inline-flex items-center gap-0.5 text-[13px] font-semibold ${
                  card.up ? 'text-[#34d399]' : 'text-[#f87171]'
                }`}
              >
                {card.up ? <ArrowUp /> : <ArrowDown />}
                {card.percent}
              </span>
            </div>
          </div>

          <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl bg-[#e6faf5]">
            <img src={card.icon} alt="" className="h-12 w-12 object-contain" />
          </div>
        </div>
      ))}
    </div>
  )
}
