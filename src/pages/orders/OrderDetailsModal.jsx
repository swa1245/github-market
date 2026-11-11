import { useEffect, useState } from 'react'
import ExportMenu from '../../components/dashboard/ExportMenu'
import arrowDown02Icon from '../../assets/images/arrow-down-02.png'
import profileAvatar from '../../assets/images/Avatar.png'
import flowerLogo from '../../assets/images/Vector.svg'

const detailTabs = [
  { id: 'details', label: 'ORDER DETAILS' },
  { id: 'products', label: 'PRODUCTS' },
  { id: 'invoice', label: 'INVOICE' },
]

const orderProducts = [
  { id: 1, name: 'MacBook Pro 15 Retina Touch Bar MV902', qty: 1, price: '$2.500', total: '$2.500' },
  { id: 2, name: 'Apple Watch Series 5 Edition GPS + Cellular', qty: 2, price: '$1.500', total: '$3.000' },
  { id: 3, name: 'Apple iPhone 11 Pro Max 256GB Space Gray', qty: 1, price: '$1.100', total: '$1.100' },
]

function SelectField({ value, onChange, options, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-[#e5e7eb] bg-white px-3 pr-8 text-[13px] text-[#3F434A] outline-none"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      <img
        src={arrowDown02Icon}
        alt=""
        className="pointer-events-none absolute top-1/2 right-3 h-3 w-3 -translate-y-1/2 object-contain opacity-70"
      />
    </div>
  )
}

function AddressCard({ title, open, onToggle, children }) {
  return (
    <div className="rounded-2xl border border-[#e5e7eb]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left sm:px-5"
      >
        <span className="text-[15px] font-semibold text-[#3F434A]">{title}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
          className={open ? 'rotate-180' : ''}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open ? <div className="border-t border-[#eeeeee] px-4 py-4 sm:px-5">{children}</div> : null}
    </div>
  )
}

function InfoLine({ label, value }) {
  return (
    <p className="text-[12px] text-[#9ca3af] sm:text-[13px]">
      {label}: <span className="text-[#4b5563]">{value}</span>
    </p>
  )
}

function ProductTable() {
  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table className="min-w-[480px] w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#eeeeee] text-[12px] font-medium tracking-wide text-[#9ca3af] uppercase">
            <th className="py-3 pr-4 font-medium">Product</th>
            <th className="w-[120px] px-2 py-3 text-right font-medium">Price</th>
            <th className="w-[120px] px-2 py-3 text-center font-medium">Quantity</th>
            <th className="w-[120px] py-3 pl-2 text-right font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {orderProducts.map((p) => (
            <tr key={p.id} className="border-b border-[#f1f3f5] text-[13px] text-[#3F434A]">
              <td className="py-4 pr-4">{p.name}</td>
              <td className="px-2 py-4 text-right text-[#6b7280]">{p.price}</td>
              <td className="px-2 py-4 text-center text-[#6b7280]">{p.qty}</td>
              <td className="py-4 pl-2 text-right text-[#6b7280]">{p.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function OrderDetailsModal({ order, onClose }) {
  const [tab, setTab] = useState('details')
  const [billingOpen, setBillingOpen] = useState(true)
  const [shippingOpen, setShippingOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('Credit Card')
  const [carrier, setCarrier] = useState('Carrier')
  const [fulfilment, setFulfilment] = useState('Delivered')
  const [payStatus, setPayStatus] = useState('Paid')

  useEffect(() => {
    setTab('details')
    setBillingOpen(true)
    setShippingOpen(false)
    setPaymentMethod(order?.payment || 'Credit Card')
    setCarrier('Carrier')
    setFulfilment(order?.status === 'Cancelled' ? 'Cancelled' : 'Delivered')
    setPayStatus(order?.status === 'Refunded' ? 'Refunded' : 'Paid')
  }, [order])

  if (!order) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center overflow-y-auto bg-black/20 p-0 sm:items-center sm:p-6">
      <button type="button" aria-label="Close" className="absolute inset-0 cursor-default" onClick={onClose} />
      <div className="relative z-[1] max-h-[96vh] w-full max-w-[920px] overflow-y-auto rounded-t-2xl bg-white px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_20px_50px_rgba(16,24,40,0.18)] sm:max-h-[92vh] sm:rounded-2xl sm:px-6 sm:py-6">
        <div className="mb-5 flex items-start justify-between gap-3 border-b border-[#eeeeee]">
          <div className="flex min-w-0 flex-1 gap-4 overflow-x-auto sm:gap-6">
            {detailTabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`relative shrink-0 cursor-pointer pb-3 text-[11px] font-medium tracking-[0.12em] sm:text-[12px] ${
                  tab === t.id ? 'text-[#21943A]' : 'text-[#9ca3af] hover:text-[#6b7280]'
                }`}
              >
                {t.label}
                {tab === t.id ? (
                  <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-[#21943A]" />
                ) : null}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mt-1 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center text-[#9ca3af] hover:text-[#6b7280]"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {tab === 'details' ? (
          <>
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <h2 className="text-[20px] font-semibold text-[#3F434A] sm:text-[22px]">Orders {order.no}</h2>
              <ExportMenu />
            </div>

            <h3 className="mb-3 text-[15px] font-semibold text-[#3F434A]">Customer</h3>
            <div className="mb-6 grid grid-cols-1 gap-3 border-b border-[#eeeeee] pb-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="mb-2 text-[11px] font-medium tracking-wide text-[#9ca3af] uppercase">Name</p>
                <div className="flex items-center gap-2">
                  <img src={profileAvatar} alt="" className="h-8 w-8 rounded-full object-cover object-top" />
                  <span className="text-[13px] font-medium text-[#3F434A]">{order.customer}</span>
                </div>
              </div>
              <div>
                <p className="mb-2 text-[11px] font-medium tracking-wide text-[#9ca3af] uppercase">Email</p>
                <p className="pt-1.5 text-[13px] text-[#6b7280]">example@mail.com</p>
              </div>
              <div>
                <p className="mb-2 text-[11px] font-medium tracking-wide text-[#9ca3af] uppercase">Phone</p>
                <p className="pt-1.5 text-[13px] text-[#6b7280]">+(070) 4567-8800</p>
              </div>
              <div>
                <p className="mb-2 text-[11px] font-medium tracking-wide text-[#9ca3af] uppercase">Location</p>
                <p className="truncate pt-1.5 text-[13px] text-[#6b7280]">993 E. Brewer St. Holtsville</p>
              </div>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_220px]">
              <div>
                <p className="mb-2 text-[15px] font-semibold text-[#3F434A]">Payment method</p>
                <SelectField
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  options={['Credit Card', 'PayPal', 'Payoneer']}
                  className="mb-3 w-full sm:max-w-[220px]"
                />
                <div className="space-y-1">
                  <InfoLine label="Transaction ID" value="000001-TXHQ" />
                  <InfoLine label="Amount" value={order.total} />
                </div>
              </div>
              <div>
                <p className="mb-2 text-[15px] font-semibold text-[#3F434A]">Shipping method</p>
                <SelectField
                  value={carrier}
                  onChange={setCarrier}
                  options={['Carrier', 'FedEx', 'UPS', 'DHL']}
                  className="mb-3 w-full sm:max-w-[220px]"
                />
                <div className="space-y-1">
                  <InfoLine label="Tracking Code" value="FX-012345-6" />
                  <InfoLine label="Date" value="12.09.2019" />
                </div>
              </div>
              <div className="rounded-2xl bg-[#f6f7fb] p-4">
                <p className="mb-1.5 text-[12px] text-[#9ca3af]">Fulfilment status</p>
                <SelectField
                  value={fulfilment}
                  onChange={setFulfilment}
                  options={['Delivered', 'Shipped', 'Processing', 'Pending', 'Cancelled']}
                  className="mb-3"
                />
                <p className="mb-1.5 text-[12px] text-[#9ca3af]">Payment status</p>
                <SelectField
                  value={payStatus}
                  onChange={setPayStatus}
                  options={['Paid', 'Pending', 'Refunded', 'Failed']}
                />
              </div>
            </div>

            <div className="space-y-3">
              <AddressCard title="Billing address" open={billingOpen} onToggle={() => setBillingOpen((v) => !v)}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <InfoLine label="First name" value="Regina" />
                    <InfoLine label="Last name" value="Cooper" />
                    <InfoLine label="Address" value="993 E. Brewer St. Holtsville" />
                  </div>
                  <div className="space-y-1.5">
                    <InfoLine label="State/Region" value="New York" />
                    <InfoLine label="City" value="New York" />
                    <InfoLine label="Country" value="United States" />
                  </div>
                  <div className="space-y-1.5">
                    <InfoLine label="Phone" value="+(070) 4567-8800" />
                    <InfoLine label="Email" value="example@mail.com" />
                    <InfoLine label="Postcode" value="11742" />
                  </div>
                </div>
              </AddressCard>
              <AddressCard title="Shipping address" open={shippingOpen} onToggle={() => setShippingOpen((v) => !v)}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <InfoLine label="First name" value="Regina" />
                    <InfoLine label="Last name" value="Cooper" />
                    <InfoLine label="Address" value="993 E. Brewer St. Holtsville" />
                  </div>
                  <div className="space-y-1.5">
                    <InfoLine label="State/Region" value="New York" />
                    <InfoLine label="City" value="New York" />
                    <InfoLine label="Country" value="United States" />
                  </div>
                  <div className="space-y-1.5">
                    <InfoLine label="Phone" value="+(070) 4567-8800" />
                    <InfoLine label="Email" value="example@mail.com" />
                    <InfoLine label="Postcode" value="11742" />
                  </div>
                </div>
              </AddressCard>
            </div>
          </>
        ) : tab === 'products' ? (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[20px] font-semibold text-[#3F434A] sm:text-[22px]">Products</h2>
              <ExportMenu />
            </div>
            <ProductTable />
          </>
        ) : (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[20px] font-semibold text-[#3F434A] sm:text-[22px]">Invoice</h2>
              <ExportMenu />
            </div>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                <div className="flex h-[88px] w-[88px] shrink-0 flex-col items-center justify-center rounded-md bg-[#F07167] text-center text-white sm:h-[120px] sm:w-[120px]">
                  <span className="text-[10px] font-semibold tracking-[0.14em] sm:text-[12px]">INVOICE</span>
                  <span className="mt-1 text-[13px] font-semibold sm:text-[15px]">{order.no}</span>
                </div>
                <div className="min-w-0 pt-1 text-[12px] leading-6 break-words text-[#9ca3af] sm:text-[13px]">
                  <p className="font-semibold tracking-wide text-[#3F434A]">ROCKET INC.</p>
                  <p>Russell st. 50, Boston, MA, USA, 02199</p>
                  <p>+1 (070) 123-4567</p>
                  <p>info@rocket.com</p>
                  <p>www.rocketboard.com</p>
                </div>
              </div>
              <div className="sm:ml-auto sm:text-right">
                <p className="mb-3 text-[13px] text-[#9ca3af]">September 12, 2019</p>
                <div className="inline-flex items-center gap-2">
                  <img src={flowerLogo} alt="" className="h-7 w-7" />
                  <span className="text-[16px] font-bold tracking-wide text-[#1f2937]">FLOWER</span>
                </div>
              </div>
            </div>

            <ProductTable />

            <div className="mt-4 ml-auto w-full max-w-none space-y-2.5 text-[13px] sm:max-w-[240px]">
              {[
                ['SUBTOTAL', '$6.600'],
                ['TAX(20%)', '$7.920'],
                ['DISCOUNT', '-$792'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="tracking-wide text-[#9ca3af]">{label}</span>
                  <span className="text-[#6b7280]">{value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-1">
                <span className="font-semibold tracking-wide text-[#3F434A]">TOTAL</span>
                <span className="font-semibold text-[#3F434A]">$7.128</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
