namespace GHAAPP.Services;
public class TokenStore
{
    private static readonly string AppName = "GHAAPP";
    private static readonly string UserName = "PersonalAccessToken";
    public static void Save(string token)
    {
        CredentialManager.WriteCredential(AppName, UserName, token);
    }
    public static string? Read()
    {
        var credential = CredentialManager.ReadCredential(AppName);
        
        if (credential == null)
        {
            return null;
        }

        if (string.IsNullOrWhiteSpace(credential.Password))
        {
            return null;
        }
        
        return credential.Password;
    }
}