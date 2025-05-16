from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.contrib import messages



# Create your views here.
def admin_login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None and user.is_staff:  # Optional: add `user.is_superuser`
            login(request, user)
            return redirect('scan_results')
        else:
            messages.error(request, "Invalid credentials or not authorized.")
    
    return render(request, 'admin_login.html')



def admin_logout_view(request):
    logout(request)
    return redirect('admin_login')