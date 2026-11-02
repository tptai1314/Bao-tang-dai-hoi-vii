import re

# Read data.js
with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update EXHIBITS_DATA
# p1_ex1
content = re.sub(
    r'(id:\s*"p1_ex1"[\s\S]*?imageUrl:\s*)"assets/images/[^"]+"',
    r'\1"assets/images/p1_a_lam_phat.webp"',
    content
)

# p1_ex2
content = re.sub(
    r'(id:\s*"p1_ex2"[\s\S]*?imageUrl:\s*)"assets/images/[^"]+"',
    r'\1"assets/images/p1_b_tuong_berlin.webp"',
    content
)

# p1_ex3
content = re.sub(
    r'(id:\s*"p1_ex3"[\s\S]*?imageUrl:\s*)"assets/images/[^"]+"',
    r'\1"assets/images/p1_centerpiece_dh6_1986.jpg"',
    content
)

# p2_ex1
content = re.sub(
    r'(id:\s*"p2_ex1"[\s\S]*?imageUrl:\s*)"assets/images/[^"]+"',
    r'\1"assets/images/p2_a_tong_bi_thu.jpg"',
    content
)

# p2_ex2
content = re.sub(
    r'(id:\s*"p2_ex2"[\s\S]*?imageUrl:\s*)"assets/images/[^"]+"',
    r'\1"assets/images/p2_b_co_dang.webp"',
    content
)

# p2_ex3
content = re.sub(
    r'(id:\s*"p2_ex3"[\s\S]*?imageUrl:\s*)"assets/images/[^"]+"',
    r'\1"assets/images/extra_dh7_toancanh.jpg"',
    content
)

# p3_ex1
content = re.sub(
    r'(id:\s*"p3_ex1"[\s\S]*?imageUrl:\s*)"assets/images/[^"]+"',
    r'\1"assets/images/p3_a_co_to_quoc.webp"',
    content
)

# p3_ex2
content = re.sub(
    r'(id:\s*"p3_ex2"[\s\S]*?imageUrl:\s*)"assets/images/[^"]+"',
    r'\1"assets/images/extra_worldmap.webp"',
    content
)

# p3_ex3
content = re.sub(
    r'(id:\s*"p3_ex3"[\s\S]*?imageUrl:\s*)"assets/images/[^"]+"',
    r'\1"assets/images/p3_b_asean_1995.webp"',
    content
)

# p4_ex1
content = re.sub(
    r'(id:\s*"p4_ex1"[\s\S]*?imageUrl:\s*)"assets/images/[^"]+"',
    r'\1"assets/images/extra_cho_1990_1.webp"',
    content
)

# p4_ex2
content = re.sub(
    r'(id:\s*"p4_ex2"[\s\S]*?imageUrl:\s*)"assets/images/[^"]+"',
    r'\1"assets/images/p4_a_tem_phieu.jpg"',
    content
)

# p4_ex3
content = re.sub(
    r'(id:\s*"p4_ex3"[\s\S]*?imageUrl:\s*)"assets/images/[^"]+"',
    r'\1"assets/images/p4_b_mau_dich.webp"',
    content
)

# Write updated data.js
with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("EXHIBITS_DATA in data.js updated successfully!")

