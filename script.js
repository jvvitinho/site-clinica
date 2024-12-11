<script>
  document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const cnpj = document.getElementById('cnpj').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cnpj, password }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          // Salva o CNPJ no localStorage para uso no dashboard
          localStorage.setItem('cnpj', cnpj);

          // Redireciona para o dashboard
          window.location.href = 'dashboard.html';
        } else {
          alert('CNPJ ou senha incorretos!');
        }
      } else {
        alert('Erro no servidor. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro de conexão. Verifique sua rede e tente novamente.');
    }
  });
</script>