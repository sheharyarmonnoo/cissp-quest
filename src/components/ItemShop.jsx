import { ITEMS, ABILITIES } from '../data/items';

export function ItemShop({ gold, inventory, level, unlockedAbilities, onBuy, onClose }) {
  return (
    <div className="shop-overlay" onClick={onClose}>
      <div className="shop-modal" onClick={e => e.stopPropagation()}>
        <div className="shop-header">
          <h2 className="shop-title">Item Shop</h2>
          <div className="shop-gold">🪙 {gold}</div>
          <button className="btn shop-close" onClick={onClose}>✕</button>
        </div>

        <div className="shop-section">
          <h3 className="shop-section-title">Items</h3>
          <div className="shop-grid">
            {Object.values(ITEMS).map(item => {
              const qty = inventory[item.id] || 0;
              const canAfford = gold >= item.cost;
              return (
                <div key={item.id} className="shop-item-card">
                  <div className="shop-item-icon">{item.icon}</div>
                  <div className="shop-item-name">{item.name}</div>
                  <div className="shop-item-desc">{item.description}</div>
                  <div className="shop-item-footer">
                    <span className="shop-item-cost">🪙 {item.cost}</span>
                    {qty > 0 && <span className="shop-item-qty">x{qty}</span>}
                  </div>
                  <button
                    className="btn btn-buy"
                    disabled={!canAfford}
                    onClick={() => onBuy(item.id)}
                  >
                    Buy
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="shop-section">
          <h3 className="shop-section-title">Abilities</h3>
          <div className="shop-grid">
            {Object.values(ABILITIES).map(ability => {
              const unlocked = unlockedAbilities.includes(ability.id);
              const canUnlock = level >= ability.unlockLevel;
              return (
                <div key={ability.id} className={`shop-item-card ability-card ${unlocked ? 'unlocked' : ''}`}>
                  <div className="shop-item-icon">{ability.icon}</div>
                  <div className="shop-item-name">{ability.name}</div>
                  <div className="shop-item-desc">{ability.description}</div>
                  <div className="shop-item-footer">
                    {unlocked ? (
                      <span className="ability-unlocked">Unlocked!</span>
                    ) : (
                      <span className="ability-req">Requires Lv.{ability.unlockLevel}</span>
                    )}
                  </div>
                  {!unlocked && (
                    <div className={`ability-lock ${canUnlock ? 'ready' : ''}`}>
                      {canUnlock ? '🔓' : '🔒'} Lv.{ability.unlockLevel}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
