import type { AppState } from '../hooks/useAppState'
import { ME } from '../constants/user'

const CHIPS = ['All', 'Leather', 'Metal', 'Latex', 'Apparel', '📍 Local pickup', '📦 Ships']

const ITEMS = [
  { title: 'Steel collar with D-ring, mirror finish', price: '$150', seller: ME.handle, initial: ME.initial, grad: ME.grad, rating: 78, tags: ['Metal', '📍 Silver Lake'] },
  { title: 'Handmade restraint cuffs, matte black', price: '$120', seller: ME.handle, initial: ME.initial, grad: ME.grad, rating: 92, tags: ['Leather', '📦 Ships'] },
  { title: 'Latex harness, barely worn, size M', price: '$95', seller: 'nocturne', initial: 'N', grad: '135deg,#7CE33A,#00FFC2', rating: 87, tags: ['Latex', '📍 DTLA'] },
  { title: 'Steel-boned corset, custom sizing', price: '$185', seller: ME.handle, initial: ME.initial, grad: ME.grad, rating: 92, tags: ['Apparel', '📦 Ships'] },
  { title: 'Pup hood, adjustable, well kept', price: '$140', seller: 'pupatlas', initial: 'P', grad: '135deg,#00FFC2,#7CE33A', rating: 81, tags: ['Leather', '📍 Highland Park'] },
  { title: 'Bar spreader, powder coated, new', price: '$70', seller: 'mercuryknot', initial: 'M', grad: '135deg,#9EFF00,#5FD000', rating: 74, tags: ['Metal', '📦 Ships'] },
]

export function MarketScreen({ app }: { app: AppState }) {
  return (
    <section className={`screen${app.screen === 'market' ? ' active' : ''}`} id="market">
      <div className="sec-head">
        <h2>Market</h2>
        <a href="#" onClick={(e) => { e.preventDefault(); app.toast('Opening new listing...') }}>+ List an item</a>
      </div>
      <div className="mkt-head">
        {CHIPS.map((chip) => (
          <button key={chip} className={`chip${app.marketChip === chip ? ' on' : ''}`} onClick={() => app.setMarketChip(chip)}>{chip}</button>
        ))}
      </div>
      <div className="mkt-grid">
        {ITEMS.map((item) => (
          <div key={item.title} className="item card">
            <div className="item-img">
              <span className="ph">photo</span>
              <div className="badges">
                <span className="pill">{item.tags[0]}</span>
                <span className="pill aqua">{item.tags[1]}</span>
              </div>
            </div>
            <div className="item-body">
              <div className="item-title">{item.title}</div>
              <div className="item-price">{item.price}</div>
              <div className="item-seller">
                <div className="sa" style={{ background: `linear-gradient(${item.grad})` }}>{item.initial}</div>
                <span className="sn">{item.seller}</span>
                <span className="sr">★ {item.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
