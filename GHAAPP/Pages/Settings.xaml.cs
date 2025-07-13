using GHAAPP.Services;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.Windows.AppNotifications;
using Microsoft.Windows.AppNotifications.Builder;

namespace GHAAPP.Pages
{
    public sealed partial class SettingsPage
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

        private void SavePersonalAccessToken(object sender, RoutedEventArgs e)
        {
            AppNotification errorNotification = new AppNotificationBuilder()
                .AddText("Invalid token provided.")
                .BuildNotification();

            try
            {
                string token = passworBoxWithRevealmode.Password;

                if (string.IsNullOrWhiteSpace(token))
                {
                    AppNotificationManager.Default.Show(errorNotification);
                    return;
                }

                TokenStore.Save(token);
                
                AppNotification notification = new AppNotificationBuilder()
                    .AddText("Token was saved.")
                    .BuildNotification();
                AppNotificationManager.Default.Show(notification);
            }
            catch 
            {
                AppNotificationManager.Default.Show(errorNotification);
            }
        }
    }
}