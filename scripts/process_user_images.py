import os
from PIL import Image

image_dir = 'assets/images'

# Plan conversions from user's PLAN_RENAME_ANH.md
conversions = [
    # Source -> Target WEBP
    ('p1_a_lam_phat.webp', 'p1_a_lam_phat.webp'),
    ('p1_b_tuong_berlin.webp', 'p1_b_tuong_berlin.webp'),
    ('p1_centerpiece_dh6_1986.jpg', 'p1_centerpiece_dh6_1986.webp'),
    ('p2_a_tong_bi_thu.jpg', 'p2_a_tong_bi_thu.webp'),
    ('p2_b_co_dang.webp', 'p2_b_co_dang.webp'),
    ('p2_centerpiece_dh7_1991.avif', 'p2_centerpiece_dh7_1991.webp'),
    ('p3_a_co_to_quoc.webp', 'p3_a_co_to_quoc.webp'),
    ('p3_b_asean_1995.avif', 'p3_b_asean_1995.webp'),
    ('p4_a_tem_phieu.jpg', 'p4_a_tem_phieu.webp'),
    ('p4_b_mau_dich.png', 'p4_b_mau_dich.webp'),
    ('extra_dh7_toancanh.jpg', 'extra_dh7_toancanh.webp'),
    ('extra_asean_30nam.jpg', 'extra_asean_30nam.webp'),
    ('extra_worldmap.webp', 'extra_worldmap.webp'),
    ('extra_cho_1990_1.avif', 'extra_cho_1990_1.webp'),
    ('extra_cho_1990_2.avif', 'extra_cho_1990_2.webp'),
    ('extra_mau_dich_2.png', 'extra_mau_dich_2.webp')
]

for src_name, dst_name in conversions:
    src_p = os.path.join(image_dir, src_name)
    dst_p = os.path.join(image_dir, dst_name)
    if os.path.exists(src_p):
        try:
            im = Image.open(src_p).convert('RGB')
            # Save as optimized WebP
            im.save(dst_p, 'WEBP', quality=85)
            # Also save as JPEG with matching base name for maximum Three.js TextureLoader fallback compatibility
            jpg_name = os.path.splitext(dst_name)[0] + '.jpg'
            jpg_p = os.path.join(image_dir, jpg_name)
            im.save(jpg_p, 'JPEG', quality=85, optimize=True)
            print(f"Processed: {src_name} -> {dst_name} ({os.path.getsize(dst_p)} b) & {jpg_name} ({os.path.getsize(jpg_p)} b)")
        except Exception as e:
            print(f"Error processing {src_name}: {e}")
    else:
        print(f"Source not found: {src_name}")

