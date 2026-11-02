import math

# Base
base_h = 0.85
base_top = base_h # since center y = base_h / 2 = 0.425, top is 0.85
base_depth = 0.5 # from z = -0.25 to +0.25
base_width = 0.75 # from x = -0.375 to +0.375

# Console
console_y = 0.95
console_z = 0.05
console_h = 0.52
console_d = 0.08
rot_x = -math.pi / 5 # -36 deg

# Console bottom in local group coordinates:
# Vector from center (0, 0) to bottom (0, -console_h/2, console_d/2):
half_h = console_h / 2
half_d = console_d / 2

# Rotated by -36 deg around X:
# y' = y * cos(rot) - z * sin(rot)
# z' = y * sin(rot) + z * cos(rot)
cos_r = math.cos(rot_x)
sin_r = math.sin(rot_x)

bottom_front_y = console_y + (-half_h * cos_r - half_d * sin_r)
bottom_front_z = console_z + (-half_h * sin_r + half_d * cos_r)

print(f"Base Top Y: {base_top:.3f}")
print(f"Console Center Y: {console_y:.3f}")
print(f"Console Bottom Front Y: {bottom_front_y:.3f}")
print(f"Console Bottom Front Z: {bottom_front_z:.3f}")
print(f"Is Console Bottom below Base Top? {bottom_front_y < base_top}")
print(f"Depth of penetration: {base_top - bottom_front_y:.3f} meters!")

# Screen
screen_h = 0.46
half_sh = screen_h / 2
screen_bottom_y = console_y + (-half_sh * cos_r - 0.045 * sin_r)
print(f"Screen Bottom Y: {screen_bottom_y:.3f}")
print(f"Is Screen Bottom below Base Top? {screen_bottom_y < base_top}")
print(f"Screen penetration into Base: {base_top - screen_bottom_y:.3f} meters!")

