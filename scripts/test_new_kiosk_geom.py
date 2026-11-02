import math

# New Kiosk Geometry
base_w = 0.70
base_h = 0.68
base_d = 0.46
base_top_y = base_h # 0.68

console_w = 0.74
console_h = 0.48
console_d = 0.08
console_y = 0.90 # center y
console_z = 0.02
rot_x = -math.pi / 6 # 30 deg

half_ch = console_h / 2 # 0.24
half_cd = console_d / 2 # 0.04

cos_r = math.cos(rot_x)
sin_r = math.sin(rot_x)

console_bottom_y = console_y + (-half_ch * cos_r - half_cd * sin_r)
print(f"Base Top Y: {base_top_y:.3f}")
print(f"Console Bottom Y: {console_bottom_y:.3f}")
print(f"Clearance between console and base top: {console_bottom_y - base_top_y:.3f} meters!")

screen_h = 0.42
half_sh = screen_h / 2
screen_bottom_y = console_y + (-half_sh * cos_r - 0.045 * sin_r)
print(f"Screen Bottom Y: {screen_bottom_y:.3f}")
print(f"Clearance between screen and base top: {screen_bottom_y - base_top_y:.3f} meters!")
assert screen_bottom_y > base_top_y, "Screen is still clipping!"
print("SUCCESS: Screen is 100% above base top!")

