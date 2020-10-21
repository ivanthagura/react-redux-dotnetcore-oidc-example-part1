using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MyCompany.IDP
{
    public static class Config
    {
        // test users
        public static List<TestUser> GetUsers()
        {
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "35d08332-a3dc-4e5b-8a35-ffe522ab3d61",
                    Username = "User1",
                    Password = "u123",

                    Claims = new List<Claim>
                    {
                        new Claim("given_name", "Jhon"),
                        new Claim("family_name", "Doe"),
                        new Claim("role", "Admin")
                    }
                },
                new TestUser
                {
                    SubjectId = "979e8d43-7f7d-4a1d-8c2d-59f145c0bfa1",
                    Username = "User2",
                    Password = "u456",

                    Claims = new List<Claim>
                    {
                        new Claim("given_name", "Jane"),
                        new Claim("family_name", "Dae"),
                        new Claim("role", "User")
                    }
                }
            };
        }

        // identity-related resources (scopes)
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResource("roles", "Your role(s)", new List<string>() { "role" })
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>()
            {
                new Client
                {
                    ClientName = "MyWebApp",
                    ClientId = "mywebappclient",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    RedirectUris = new List<string>()
                    {
                        "https://localhost:44308/callback"
                    },
                    PostLogoutRedirectUris = new List<string>()
                    {
                        "https://localhost:44308/"
                    },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "roles"
                    },
                    ClientSecrets =
                    {
                        new Secret("mywebappsecret".Sha256())
                    },
                    //AllowedCorsOrigins = new List<string>
                    //{
                    //    "https://localhost:44308/"
                    //},
                    AllowAccessTokensViaBrowser = true
                }
            };
        }
    }
}
