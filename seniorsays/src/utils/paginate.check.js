// Chalane ka tareeka:  node src/utils/paginate.check.js
// Koi test framework nahi — bas assert. Slice math galat hui toh ye turant phategi.
import assert from 'node:assert/strict';
import { paginate } from './paginate.js';

const items = Array.from({ length: 25 }, (_, i) => i + 1);   // [1..25]

// Pehla page: pehle 10
let r = paginate(items, 1, 10);
assert.deepEqual(r.visible, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.equal(r.totalPages, 3);
assert.equal(r.currentPage, 1);

// Beech ka page: koi item skip/repeat nahi hona chahiye (classic off-by-one)
r = paginate(items, 2, 10);
assert.deepEqual(r.visible, [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

// Aakhri page adhoora: sirf bache hue 5
r = paginate(items, 3, 10);
assert.deepEqual(r.visible, [21, 22, 23, 24, 25]);

// Exact multiple: 20 items / 10 = 2 page, 3 nahi
assert.equal(paginate(items.slice(0, 20), 1, 10).totalPages, 2);

// Range se bahar ka page -> aakhri page pe clamp (khaali grid nahi)
r = paginate(items, 99, 10);
assert.equal(r.currentPage, 3);
assert.deepEqual(r.visible, [21, 22, 23, 24, 25]);

// 0 / negative page -> page 1
assert.equal(paginate(items, 0, 10).currentPage, 1);
assert.equal(paginate(items, -5, 10).currentPage, 1);

// Khaali list (search me kuch nahi mila) -> crash nahi, 0 page, currentPage 1
r = paginate([], 1, 10);
assert.deepEqual(r.visible, []);
assert.equal(r.totalPages, 0);
assert.equal(r.currentPage, 1);

// Ek page se kam items -> ek hi page
assert.equal(paginate(items.slice(0, 3), 1, 10).totalPages, 1);

console.log('paginate: saare checks pass ✓');
