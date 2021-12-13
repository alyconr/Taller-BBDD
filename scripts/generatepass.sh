PASSWORD=$(htpasswd -bnBC 10 "" ${2} | tr -d ':\n' | sed 's/$2y/$2b/')

cat << EOF > mockUsername.json
[
    {
        "email": "${1}",
        "password": "${PASSWORD}",
        "tokens": []
    }
]
EOF