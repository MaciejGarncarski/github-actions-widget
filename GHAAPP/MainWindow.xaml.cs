using System;
using GHAAPP.Pages;
using Microsoft.UI;
using Microsoft.UI.Windowing;
using WinRT.Interop;

namespace GHAAPP
{
    public sealed partial class MainWindow
    {
        public MainWindow()
        {
            InitializeComponent();
            MainFrame.Navigate(typeof(Shell));
            ExtendsContentIntoTitleBar = true;
            AppWindow.TitleBar.PreferredHeightOption = TitleBarHeightOption.Tall;

            IntPtr hwnd = WindowNative.GetWindowHandle(this);
            WindowId windowId = Win32Interop.GetWindowIdFromWindow(hwnd);
            AppWindow appWindow = AppWindow.GetFromWindowId(windowId);

            if (appWindow.Presenter is OverlappedPresenter presenter)
            {
                presenter.PreferredMinimumWidth = 500;
                presenter.PreferredMinimumHeight = 600;
            }
        }
    }
}