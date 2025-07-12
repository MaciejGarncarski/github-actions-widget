using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.Windows.AppNotifications;
using Microsoft.Windows.AppNotifications.Builder;

namespace GHAAPP.Pages
{
    public sealed partial class SettingsPage : Page
    {
        public SettingsPage()
        {
            InitializeComponent();
        }
        
        private void RevealModeCheckbox_Changed(object sender, RoutedEventArgs e)
        {
            if (revealModeCheckBox.IsChecked == true)
            {
                passworBoxWithRevealmode.PasswordRevealMode = PasswordRevealMode.Visible;
            }
            else
            {
                passworBoxWithRevealmode.PasswordRevealMode = PasswordRevealMode.Hidden;
            }
        }

        private void SavePATHButton_Click(object sender, RoutedEventArgs e)
        {
            AppNotification notification = new AppNotificationBuilder()
                .AddText("Welcome to WinUI 3 Gallery")
                .AddText("Explore interactive samples and discover the power of modern Windows UI.")
                .BuildNotification();

            AppNotificationManager.Default.Show(notification);
        }
    }
}
